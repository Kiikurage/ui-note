import sizeOf from 'image-size';
import path from 'path';
import * as mdast from 'mdast';
import * as footnote from 'mdast-util-footnote';
import fromMarkdown from 'mdast-util-from-markdown';
import * as syntax from 'micromark-extension-footnote';

export interface EnhancedRoot extends mdast.Root {
    footnoteDefinitions: EnhancedFootnoteDefinition[];
}

export interface EnhancedFootnoteReference extends mdast.FootnoteReference {
    originalIdentifier: string;
}

export interface EnhancedFootnoteDefinition extends mdast.FootnoteDefinition {
    originalIdentifier: string;
}

export interface EnhancedImage extends mdast.Image {
    width: number | undefined;
    height: number | undefined;
}

interface Context {
    footnoteDefinitions: EnhancedFootnoteDefinition[];
    footnoteIdentifierMap: Map<string, string>;
}

function createContext(): Context {
    return {
        footnoteDefinitions: [],
        footnoteIdentifierMap: new Map<string, string>(),
    };
}

export function parseMarkdown(source: string): mdast.Root {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
    const markdownAST = fromMarkdown(source, {
        extensions: [syntax({ inlineNotes: true })],
        mdastExtensions: [footnote.fromMarkdown],
    });
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

    return enhanceNode(markdownAST, createContext()) as mdast.Root;
}

function enhanceNode(node: mdast.Root | mdast.Content, context: Context): mdast.Root | mdast.Content | null {
    switch (node.type) {
        case 'root': {
            const children = enhanceChildren(node.children, context);

            const enhancedNode: EnhancedRoot = {
                ...node,
                children: children,

                // FootnoteDefinitionを文章の最後にまとめて乗せる。
                footnoteDefinitions: context.footnoteDefinitions.sort((d1, d2) =>
                    d1.identifier < d2.identifier ? -1 : d1.identifier > d2.identifier ? 1 : 0
                ),
            };
            return enhancedNode;
        }

        case 'paragraph':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'heading':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'blockquote':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'list':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'listItem':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'table':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'tableCell':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'tableRow':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'emphasis':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'strong':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'delete':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'link':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'linkReference':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'footnote':
            return { ...node, children: enhanceChildren(node.children, context) };

        case 'footnoteDefinition': {
            // FootnoteDefinitionを集め、文章の最後にまとめて乗せる。同時に、referenceのidentifierを番号に変換する
            let identifier = context.footnoteIdentifierMap.get(node.identifier);
            if (identifier === undefined) {
                identifier = (context.footnoteIdentifierMap.size + 1).toString();
                context.footnoteIdentifierMap.set(node.identifier, identifier);
            }
            const enhancedNode: EnhancedFootnoteDefinition = {
                ...node,
                children: enhanceChildren(node.children, context),
                identifier: identifier,
                originalIdentifier: node.identifier,
            };

            context.footnoteDefinitions.push(enhancedNode);
            return null;
        }

        case 'footnoteReference': {
            // referenceのidentifierを番号に変換する
            let identifier = context.footnoteIdentifierMap.get(node.identifier);
            if (identifier === undefined) {
                identifier = (context.footnoteIdentifierMap.size + 1).toString();
                context.footnoteIdentifierMap.set(node.identifier, identifier);
            }
            const enhancedNode: EnhancedFootnoteReference = {
                ...node,
                identifier: identifier,
                originalIdentifier: node.identifier,
            };

            return enhancedNode;
        }

        case 'image': {
            if (node.url.startsWith('/')) {
                // image
                let width: number | undefined;
                let height: number | undefined;
                try {
                    const shape = sizeOf(path.resolve(process.cwd(), './public/', '.' + node.url));
                    width = shape.width;
                    height = shape.height;
                } catch {
                    // ignored
                }

                const enhancedNode: EnhancedImage = {
                    ...node,
                    width: width,
                    height: height,
                };
                return enhancedNode;
            }

            return node;
        }

        case 'text':
        case 'break':
        case 'code':
        case 'definition':
        case 'html':
        case 'imageReference':
        case 'inlineCode':
        case 'thematicBreak':
        case 'yaml':
        default:
            return node;
    }
}

function enhanceChildren<T extends mdast.Root | mdast.Content>(nodes: T[], context: Context): T[] {
    return nodes.map((node) => enhanceNode(node, context)).filter((node) => node !== null) as T[];
}

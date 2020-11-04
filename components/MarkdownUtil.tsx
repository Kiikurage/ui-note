import * as mdast from 'mdast';
import { FootnoteDefinition } from 'mdast';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { SampleViewer } from './SampleViewer';
import { COLOR_BLUEGREY_100, COLOR_BLUEGREY_200, COLOR_BLUEGREY_600, MEDIA_QUERY_ONLY_MOBILE } from './styles/styles';

interface RenderingContext {
    footnoteDefinitions: FootnoteDefinition[];
    footnoteIdentifierMap: Map<string, string>;
    reverseFootnoteIdentifierMap: Map<string, string>;
}

const Paragraph = styled.div`
    margin: 16px 0 16px;
`;

const HeaderAnchorLinkBase = styled.a`
    position: absolute;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    border-radius: 1em;
    cursor: pointer;
    color: unset;
    left: -1.2em;
    line-height: 1;
    opacity: 0.3;
    padding: 0.25em;
    transition: opacity 100ms linear;
    user-select: none;
    width: unset;

    &:hover {
        opacity: 0.7;
    }
    &:active {
        transition: none;
        opacity: 1;
    }

    ${MEDIA_QUERY_ONLY_MOBILE} {
        position: relative;
        left: unset;
    }
`;

const HeaderMixin = css`
    position: relative;
`;

const H1 = styled.h1`
    ${HeaderMixin}
`;

const H2 = styled.h2`
    ${HeaderMixin};
    margin: 36px 0 8px;
    border-bottom: 1px solid ${COLOR_BLUEGREY_100};

    ${Paragraph} {
        margin: 0;
    }
`;

const H3 = styled.h3`
    ${HeaderMixin};
    margin: 24px 0 0;

    ${Paragraph} {
        margin: 0;
    }
`;

const H4 = styled.h4`
    ${HeaderMixin}
`;

const H5 = styled.h5`
    ${HeaderMixin}
`;

const H6 = styled.h6`
    ${HeaderMixin}
`;

const UL = styled.ul`
    margin: 16px 0;
`;

const LI = styled.li`
    ${Paragraph} {
        margin-top: 4px;
        margin-bottom: 4px;
    }
`;

const Footnote = styled.footer`
    margin: 64px 0 0;
    border-top: 1px solid ${COLOR_BLUEGREY_100};
    padding-top: 24px;
    line-height: 1.2;

    ol {
        margin: 0;
        padding-left: 24px;
    }

    ${Paragraph} {
        margin: 0 0 4px;
    }
`;

const FootnoteMarker = styled.sup`
    cursor: pointer;
    line-height: 1;
`;

const FootnoteDefinitionView = styled.li`
    font-size: 0.875em;
    &:target {
        background: #ff0;
    }
`;

const Blockquote = styled.blockquote`
    display: block;
    border-left: 4px solid ${COLOR_BLUEGREY_200};
    padding-left: 16px;
    margin-left: 0;
`;

const ImageViewer = styled.figure`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: min(100%, 640px);
    border-radius: 2px;
    padding: 0;
    margin: 0;
    gap: 8px;
    box-sizing: border-box;

    img {
        position: relative;
        max-width: 100%;
        max-height: 40vh;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
    }

    figcaption {
        color: ${COLOR_BLUEGREY_600};
        font-size: 0.875em;
        word-break: break-all;
        text-align: left;
    }
`;

function createRenderingContext(): RenderingContext {
    return {
        footnoteDefinitions: [],
        footnoteIdentifierMap: new Map<string, string>(),
        reverseFootnoteIdentifierMap: new Map<string, string>(),
    };
}

export function renderMarkdown(root: mdast.Root): React.ReactNode {
    const context = createRenderingContext();

    const result = renderNodes(root.children, context);
    if (context.footnoteDefinitions.length > 0) {
        result.push(
            <Footnote key="footer">
                <ol>
                    {context.footnoteDefinitions
                        .sort((d1, d2) => (d1.identifier < d2.identifier ? -1 : d1.identifier > d2.identifier ? 1 : 0))
                        .map((node) => renderNode(node, context))}
                </ol>
            </Footnote>
        );
    }

    return result;
}

function renderNodes(nodes: mdast.Content[], context: RenderingContext): React.ReactNode[] {
    const result: React.ReactNode[] = [];

    for (let node of nodes) {
        if (node.type === 'footnoteDefinition') {
            let identifier = context.footnoteIdentifierMap.get(node.identifier);
            if (identifier === undefined) {
                identifier = (context.footnoteIdentifierMap.size + 1).toString();
                context.footnoteIdentifierMap.set(node.identifier, identifier);
                context.reverseFootnoteIdentifierMap.set(identifier, node.identifier);
            }
            context.footnoteDefinitions.push({ ...node, identifier: identifier });
            continue;
        }

        if (node.type === 'footnoteReference') {
            let identifier = context.footnoteIdentifierMap.get(node.identifier);
            if (identifier === undefined) {
                identifier = (context.footnoteIdentifierMap.size + 1).toString();
                context.footnoteIdentifierMap.set(node.identifier, identifier);
                context.reverseFootnoteIdentifierMap.set(identifier, node.identifier);
            }
            node = { ...node, identifier: identifier };
        }

        result.push(renderNode(node, context));
    }

    return result;
}

function generateKey(node: mdast.Content): string {
    return `${node.type}-${node.position.start.offset}`;
}

function HeaderAnchorLink(props: { node: mdast.Heading }): React.ReactElement {
    const hash = encodeURIComponent(getTextFromNode(props.node));
    return (
        <HeaderAnchorLinkBase id={hash} href={'#' + hash}>
            #
        </HeaderAnchorLinkBase>
    );
}

function getTextFromNode(node: mdast.Content): string {
    if ('children' in node) {
        return (node.children as mdast.Content[]).map(getTextFromNode).join('');
    } else if (node.type === 'text') {
        return node.value;
    } else {
        return '';
    }
}

function renderNode(node: mdast.Content, context: RenderingContext): React.ReactElement {
    switch (node.type) {
        case 'text':
            return <>{node.value}</>;

        case 'paragraph': {
            return <Paragraph key={generateKey(node)}>{renderNodes(node.children, context)}</Paragraph>;
        }

        case 'heading': {
            switch (node.depth) {
                case 1:
                    return (
                        <H1 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H1>
                    );
                case 2:
                    return (
                        <H2 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H2>
                    );
                case 3:
                    return (
                        <H3 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H3>
                    );
                case 4:
                    return (
                        <H4 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H4>
                    );
                case 5:
                    return (
                        <H5 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H5>
                    );
                case 6:
                default:
                    return (
                        <H6 key={generateKey(node)}>
                            {renderNodes(node.children, context)}
                            <HeaderAnchorLink node={node} />
                        </H6>
                    );
            }
        }

        case 'list': {
            if (node.ordered) {
                return <ol key={generateKey(node)}>{renderNodes(node.children, context)}</ol>;
            } else {
                return <UL key={generateKey(node)}>{renderNodes(node.children, context)}</UL>;
            }
        }

        case 'listItem':
            return (
                <LI key={generateKey(node)}>
                    <div>{renderNodes(node.children, context)}</div>
                </LI>
            );

        case 'link': {
            if (node.url.startsWith('/')) {
                return (
                    <Link href={node.url} key={generateKey(node)}>
                        <span>{renderNodes(node.children, context)}</span>
                    </Link>
                );
            } else {
                return (
                    <a href={node.url} target="_blank" rel="noopener noreferrer" key={generateKey(node)}>
                        {renderNodes(node.children, context)}
                    </a>
                );
            }
        }

        case 'image': {
            // image要素を特別な用途に流用する。URLのプロトコルスキーマで切り替える
            const parts = node.url.split(':');
            const resourceType = parts.length > 1 ? parts[0] : 'image';
            const resourceUrl = parts.length > 1 ? parts.slice(1).join(':') : node.url;

            if (resourceType === 'sample') {
                return <SampleViewer title={node.alt} src={resourceUrl} key={generateKey(node)} />;
            } else {
                return (
                    <ImageViewer key={generateKey(node)}>
                        <img src={node.url} alt={node.alt} />
                        <figcaption>{node.title?.trim() ?? ''}</figcaption>
                    </ImageViewer>
                );
            }
        }

        case 'footnoteReference': {
            const id = 'footer-' + context.reverseFootnoteIdentifierMap.get(node.identifier);
            return (
                <FootnoteMarker key={generateKey(node)}>
                    <a href={'#' + id}>
                        <span>[{node.identifier}]</span>
                    </a>
                </FootnoteMarker>
            );
        }

        case 'footnoteDefinition':
            return (
                <FootnoteDefinitionView
                    id={'footer-' + context.reverseFootnoteIdentifierMap.get(node.identifier)}
                    value={node.identifier}
                    key={generateKey(node)}
                >
                    {renderNodes(node.children, context)}
                </FootnoteDefinitionView>
            );

        case 'blockquote':
            return <Blockquote key={generateKey(node)}>{renderNodes(node.children, context)}</Blockquote>;

        case 'strong':
            return <b key={generateKey(node)}>{renderNodes(node.children, context)}</b>;

        case 'break':
        case 'code':
        case 'definition':
        case 'delete':
        case 'emphasis':
        case 'footnote':
        case 'html':
        case 'imageReference':
        case 'inlineCode':
        case 'linkReference':
        case 'table':
        case 'tableCell':
        case 'tableRow':
        case 'thematicBreak':
        case 'yaml':
        default:
            return <>{JSON.stringify(node)}</>;
    }
}

import * as mdast from 'mdast';
import Link from 'next/link';
import React from 'react';
import { SampleViewer } from '../SampleViewer';
import { MarkdownHeadingView } from './MarkdownHeadingView';

export function renderMarkdown(root: mdast.Root): React.ReactNode {
    return renderNodes(root.children);
}

export function renderNodes(nodes: mdast.Content[]): React.ReactNode {
    return nodes.map((node) => renderNode(node));
}

export function renderNode(node: mdast.Content): React.ReactElement {
    switch (node.type) {
        case 'text':
            return <>{node.value}</>;

        case 'paragraph':
            return <>{renderNodes(node.children)}</>;

        case 'heading':
            return <MarkdownHeadingView node={node} />;

        case 'list': {
            if (node.ordered) {
                return <ol>{renderNodes(node.children)}</ol>;
            } else {
                return <ul>{renderNodes(node.children)}</ul>;
            }
        }

        case 'listItem':
            return <li>{renderNodes(node.children)}</li>;

        case 'link': {
            if (node.url.startsWith('/')) {
                return (
                    <Link href={node.url}>
                        <span>{renderNodes(node.children)}</span>
                    </Link>
                );
            } else {
                return (
                    <a href={node.url} target="_blank" rel="noopener noreferrer">
                        {renderNodes(node.children)}
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
                return <SampleViewer src={resourceUrl} />;
            } else {
                return <img src={node.url} alt={node.alt} />;
            }
        }
        case 'blockquote':
        case 'break':
        case 'code':
        case 'definition':
        case 'delete':
        case 'emphasis':
        case 'footnote':
        case 'footnoteDefinition':
        case 'footnoteReference':
        case 'html':
        case 'imageReference':
        case 'inlineCode':
        case 'linkReference':
        case 'strong':
        case 'table':
        case 'tableCell':
        case 'tableRow':
        case 'thematicBreak':
        case 'yaml':
        default:
            return <>{JSON.stringify(node)}</>;
    }
}

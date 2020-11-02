import * as mdast from 'mdast';
import React from 'react';
import { renderNodes } from './MarkdownUtil';

export function MarkdownHeadingView(props: { node: mdast.Heading }): React.ReactElement {
    const node = props.node;

    if (node.depth === 1) {
        return <h1>{renderNodes(node.children)}</h1>;
    } else if (node.depth === 2) {
        return <h2>{renderNodes(node.children)}</h2>;
    } else if (node.depth === 3) {
        return <h3>{renderNodes(node.children)}</h3>;
    } else if (node.depth === 4) {
        return <h4>{renderNodes(node.children)}</h4>;
    } else if (node.depth === 5) {
        return <h5>{renderNodes(node.children)}</h5>;
    } else if (node.depth === 6) {
        return <h6>{renderNodes(node.children)}</h6>;
    }
}

import * as mdast from 'mdast';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { EnhancedFootnoteDefinition, EnhancedFootnoteReference, EnhancedImage, EnhancedRoot } from './MarkdownParseUtil';
import { SampleViewer } from './SampleViewer';
import { COLOR_BLUEGREY_100, COLOR_BLUEGREY_200, COLOR_BLUEGREY_600, COLOR_LINK, MEDIA_QUERY_ONLY_MOBILE } from './styles/styles';

const UL = styled.ul`
    margin: 0 0 8px;
`;

const Paragraph = styled.div`
    margin: 8px 0 0;
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

    + ${Paragraph} {
        margin-top: 0;
    }
`;

const H1 = styled.h1`
    ${HeaderMixin}
`;

const H2 = styled.h2`
    ${HeaderMixin};
    margin: 36px 0 0;
    font-size: 28px;
    color: ${COLOR_BLUEGREY_600};
    border-bottom: 2px solid ${COLOR_BLUEGREY_100};

    + * {
        margin-top: 0;
    }
`;

const H3 = styled.h3`
    ${HeaderMixin};
    margin: 32px 0 0;
    font-size: 20px;

    + * {
        margin-top: 0;
    }
`;

const H4 = styled.h4`
    ${HeaderMixin};
    margin: 16px 0 0;

    + * {
        margin-top: 0;
    }
`;

const H5 = styled.h5`
    ${HeaderMixin};
    margin: 16px 0 0;
`;

const H6 = styled.h6`
    ${HeaderMixin};
    margin: 16px 0 0;
`;

const LI = styled.li`
    ${Paragraph} {
        margin: 0;
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
    color: ${COLOR_BLUEGREY_600};
`;

const ImageViewer = styled.figure`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: min(100%, 640px);
    border-radius: 2px;
    padding: 0;
    margin: 8px 0;
    gap: 8px;
    box-sizing: border-box;

    img {
        position: relative;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
    }

    figcaption {
        color: ${COLOR_BLUEGREY_600};
        font-size: 0.875em;
        word-break: break-all;
        text-align: left;
    }
`;

const InlineCode = styled.code`
    background: #e8e8e8;
    font-size: 0.9em;
    font-family: monospace;
    padding: 2px 4px;
    margin: 2px 4px;
    border-radius: 2px;
`;

const StyledLinkBody = styled.span`
    color: ${COLOR_LINK};
    text-decoration: underline;
    cursor: pointer;
`;

function HeaderAnchorLink(props: { node: mdast.Heading }): React.ReactElement {
    const hash = encodeURIComponent(getTextFromNode(props.node));
    return (
        <HeaderAnchorLinkBase id={hash} href={'#' + hash}>
            #
        </HeaderAnchorLinkBase>
    );
}

export function renderMarkdown(node: mdast.Root | mdast.Content): React.ReactElement {
    switch (node.type) {
        case 'root': {
            return (
                <>
                    {renderNodes(node.children)}
                    {(node as EnhancedRoot).footnoteDefinitions.length > 0 && (
                        <Footnote>
                            <ol>{renderNodes((node as EnhancedRoot).footnoteDefinitions)}</ol>
                        </Footnote>
                    )}
                </>
            );
        }

        case 'text':
            return <>{node.value}</>;

        case 'paragraph': {
            return <Paragraph key={generateKey(node)}>{node.children.map(renderMarkdown)}</Paragraph>;
        }

        case 'heading': {
            switch (node.depth) {
                case 1:
                    return (
                        <H1 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H1>
                    );
                case 2:
                    return (
                        <H2 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H2>
                    );
                case 3:
                    return (
                        <H3 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H3>
                    );
                case 4:
                    return (
                        <H4 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H4>
                    );
                case 5:
                    return (
                        <H5 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H5>
                    );
                case 6:
                default:
                    return (
                        <H6 key={generateKey(node)}>
                            {node.children.map(renderMarkdown)}
                            <HeaderAnchorLink node={node} />
                        </H6>
                    );
            }
        }

        case 'list': {
            if (node.ordered) {
                return <ol key={generateKey(node)}>{node.children.map(renderMarkdown)}</ol>;
            } else {
                return <UL key={generateKey(node)}>{node.children.map(renderMarkdown)}</UL>;
            }
        }

        case 'listItem':
            return (
                <LI key={generateKey(node)}>
                    <div>{node.children.map(renderMarkdown)}</div>
                </LI>
            );

        case 'link': {
            if (node.url.startsWith('/')) {
                return (
                    <Link href={node.url} key={generateKey(node)}>
                        <StyledLinkBody>{node.children.map(renderMarkdown)}</StyledLinkBody>
                    </Link>
                );
            } else {
                return (
                    <a href={node.url} target="_blank" rel="noopener noreferrer" key={generateKey(node)}>
                        {node.children.map(renderMarkdown)}
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
                let { width, height } = node as EnhancedImage;
                const MAX_HEIGHT = 320;
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }

                let image: React.ReactNode;
                if (width !== undefined && height !== undefined) {
                    image = <Image src={node.url} alt={node.alt} width={width} height={height} />;
                } else {
                    image = <img src={node.url} alt={node.alt} />;
                }

                return (
                    <ImageViewer key={generateKey(node)}>
                        {image}
                        <figcaption>{node.title?.trim() ?? ''}</figcaption>
                    </ImageViewer>
                );
            }
        }

        case 'footnoteReference': {
            const id = `footer-${(node as EnhancedFootnoteReference).originalIdentifier}`;
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
                    id={`footer-${(node as EnhancedFootnoteDefinition).originalIdentifier}`}
                    value={node.identifier}
                    key={generateKey(node)}
                >
                    {node.children.map(renderMarkdown)}
                </FootnoteDefinitionView>
            );

        case 'blockquote':
            return <Blockquote key={generateKey(node)}>{node.children.map(renderMarkdown)}</Blockquote>;

        case 'strong':
            return <b key={generateKey(node)}>{node.children.map(renderMarkdown)}</b>;

        case 'inlineCode':
            return <InlineCode key={generateKey(node)}>{node.value}</InlineCode>;

        case 'break':
            return <br />;

        case 'code':
        case 'definition':
        case 'delete':
        case 'emphasis':
        case 'footnote':
        case 'html':
        case 'imageReference':
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

function renderNodes(nodes: mdast.Content[]): React.ReactNode {
    return nodes.map(renderMarkdown);
}

function generateKey(node: mdast.Content): string {
    return `${node.type}-${node.position.start.offset}`;
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

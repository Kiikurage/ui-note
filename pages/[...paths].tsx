import * as mdast from 'mdast';
import * as footnote from 'mdast-util-footnote';
import fromMarkdown from 'mdast-util-from-markdown';
import * as syntax from 'micromark-extension-footnote';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { Helmet } from '../components/Helmet';
import { Layout } from '../components/Layout';
import { renderMarkdown } from '../components/MarkdownUtil';
import { PageTitle } from '../components/PageTitle';
import { SidePaneItemData } from '../model/SidePaneItemData';

interface URLProps {
    paths: string[];

    [key: string]: string | string[];
}

interface Props {
    items: SidePaneItemData[];
    currentItem: SidePaneItemData;
    markdownAST: mdast.Root;

    [key: string]: unknown;
}

export const getStaticPaths: GetStaticPaths<URLProps> = async () => {
    const queue: SidePaneItemData[] = await SidePaneItemData.loadAll();
    const flattenItems: SidePaneItemData[] = [];

    while (queue.length > 0) {
        const item = queue.shift();
        if (item === undefined) break;

        flattenItems.push(item);
        queue.push(...item.children);
    }

    return {
        paths: flattenItems.map((item) => item.path),
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps<Props, URLProps> = async (context) => {
    const items = await SidePaneItemData.loadAll();
    const paths = context.params.paths;

    let item: SidePaneItemData;
    while (paths.length > 0) {
        const pathPart = paths.shift();
        if (pathPart === undefined) break;

        item = (item?.children || items).find((item) => item.path.split('/').slice(-1)[0] === pathPart);
        if (!item) throw new Error('!');
    }
    item.selected = true;

    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
    const markdownAST = fromMarkdown(item.body, {
        extensions: [syntax({ inlineNotes: true })],
        mdastExtensions: [footnote.fromMarkdown],
    });
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

    return {
        props: {
            items: items,
            currentItem: item,
            markdownAST: markdownAST,
        } as Props,
    };
};

export default function IndexPage(props: Props): React.ReactElement {
    return (
        <Layout items={props.items}>
            <Helmet title={`${props.currentItem.title} - UIノート`} description={props.currentItem.body.substr(0, 240) + '...'} />
            <PageTitle>{props.currentItem.title}</PageTitle>
            {renderMarkdown(props.markdownAST)}
        </Layout>
    );
}

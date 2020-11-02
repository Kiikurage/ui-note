import * as mdast from 'mdast';
import fromMarkdown from 'mdast-util-from-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Layout';
import { renderMarkdown } from '../components/markdown/MarkdownUtil';
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

    const markdownAST = fromMarkdown(item.body);

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
            <Head>
                <title>{props.currentItem.title} - UIノート</title>
            </Head>
            <PageTitle>{props.currentItem.title}</PageTitle>
            {renderMarkdown(props.markdownAST)}
        </Layout>
    );
}

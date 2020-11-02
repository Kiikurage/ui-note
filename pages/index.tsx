import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/PageTitle';
import { SidePaneItemData } from '../model/SidePaneItemData';

interface Props {
    sidePaneItems: SidePaneItemData[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sidePaneItems = await SidePaneItemData.loadAll();

    return {
        props: {
            sidePaneItems: sidePaneItems,
        },
    };
};

export default function IndexPage(props: Props): React.ReactElement {
    return (
        <Layout items={props.sidePaneItems}>
            <Head>
                <title>UIノート</title>
            </Head>
            <PageTitle>トップページ</PageTitle>
        </Layout>
    );
}

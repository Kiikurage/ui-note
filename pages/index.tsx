import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
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
                <link rel="manifest" href="/manifest.json" />
                <title>UIノート</title>
            </Head>
            <SWRegister />
            <PageTitle>トップページ</PageTitle>
        </Layout>
    );
}

function SWRegister(): React.ReactElement {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.log('service worker registration successful');
                })
                .catch((err) => {
                    console.warn('service worker registration failed', err.message);
                });
        }
    }, []);

    return null;
}

import { GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import { Helmet } from '../components/Helmet';
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
            <Helmet title="UIノート" description="UIに関する情報を記録するサイト" />
            <SWRegister />
            <PageTitle>トップページ</PageTitle>
        </Layout>
    );
}

function SWRegister(): React.ReactElement {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            void navigator.serviceWorker.register('/sw.js');
        }
    }, []);

    return null;
}

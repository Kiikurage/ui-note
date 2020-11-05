import { GetStaticProps } from 'next';
import React from 'react';
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
            <PageTitle>このサイトについて</PageTitle>
            <ul>
                <li>
                    公開されているデザインシステムを横断的に確認できる資料集を目指す予定。
                    特に、デザインの根拠・論理的説明を重視し、具体的な実装やUIライブラリの説明などはカバーしない。
                </li>
                <li>複数のデザインシステムやその他からベストプラクティスを集めているため、内容には互いに矛盾している項目も含まれうる。</li>
            </ul>
        </Layout>
    );
}

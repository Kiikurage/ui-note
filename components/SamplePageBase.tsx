import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_ONLY_MOBILE } from './styles/styles';

const Base = styled.main`
    padding: 32px 32px;
    position: absolute;
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid transparent;
    ${MEDIA_QUERY_ONLY_MOBILE} {
        padding: 16px;
    }
`;

export function SamplePageBase(props: React.PropsWithChildren<unknown>): React.ReactElement {
    return (
        <Base>
            <Head>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </Head>
            {props.children}
        </Base>
    );
}

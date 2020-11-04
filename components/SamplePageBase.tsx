import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Base = styled.main`
    padding: 16px 8px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
`;

export function SamplePageBase(props: React.PropsWithChildren<unknown>): React.ReactElement {
    return <Base>{props.children}</Base>;
}

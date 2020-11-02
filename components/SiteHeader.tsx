import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { COLOR_BLUEGREY_100, COLOR_BLUEGREY_700, FONT_WEIGHT_LIGHT } from './styles/styles';

const Base = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 32px;
    padding: 16px 32px;
    border-bottom: 1px solid ${COLOR_BLUEGREY_100};
    background: #fff;
    z-index: 1;
    box-sizing: border-box;
`;

const Title = styled.h1`
    color: ${COLOR_BLUEGREY_700};
    margin: 0;
    padding: 0;
    font-weight: ${FONT_WEIGHT_LIGHT};
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
`;

export function SiteHeader(): React.ReactElement {
    return (
        <Base>
            <Link href="/">
                <Title>UIノート</Title>
            </Link>
        </Base>
    );
}

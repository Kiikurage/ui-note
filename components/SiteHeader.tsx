import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { COLOR_BLUEGREY_100, COLOR_BLUEGREY_700, COLOR_BLUEGREY_900, FONT_WEIGHT_LIGHT } from './styles/styles';
import GitHubIcon from '../public/github.svg';

const Base = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 32px;
    padding: 0 32px;
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

const Block = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

const IconButton = styled.button`
    background: none;
    color: ${COLOR_BLUEGREY_900};
    opacity: 0.3;
    cursor: pointer;
    border: none;
    transition: opacity 100ms;
    padding: 8px;
    outline: none;

    svg {
        fill: currentColor;
    }

    &:hover,
    &:focus {
        opacity: 0.8;
    }
    &:active {
        opacity: 1;
    }
`;

export function SiteHeader(): React.ReactElement {
    return (
        <Base>
            <Block>
                <Link href="/">
                    <Title>UIノート</Title>
                </Link>
            </Block>
            <Block>
                <a href="https://github.com/Kiikurage/ui-note" target="_blank" rel="noopener noreferrer">
                    <IconButton>
                        <GitHubIcon width={24} height={24} />
                    </IconButton>
                </a>
            </Block>
        </Base>
    );
}

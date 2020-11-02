import Link from 'next/link';
import { rgba } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SidePaneItemData } from '../model/SidePaneItemData';
import GitHubIcon from '../public/github.svg';
import MenuIcon from '../public/menu-24px.svg';
import { SidePaneList, SidePaneListItem } from './SidePaneList';
import {
    BOX_SHADOW_LEVEL5,
    COLOR_BLUEGREY_100,
    COLOR_BLUEGREY_700,
    COLOR_BLUEGREY_900,
    EASING_EASE_OUT,
    FONT_WEIGHT_LIGHT,
    MEDIA_QUERY_ONLY_MOBILE,
    MEDIA_QUERY_ONLY_PC,
} from './styles/styles';

const Title = styled.h1`
    color: ${COLOR_BLUEGREY_700};
    margin: 0;
    padding: 0;
    font-weight: ${FONT_WEIGHT_LIGHT};
    font-size: 20px;
    line-height: 1;
    cursor: pointer;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        display: none;
    }
`;

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid ${COLOR_BLUEGREY_100};
    background: #fff;
    z-index: 1;
    box-sizing: border-box;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        padding: 0 16px;
    }
`;

const HeaderBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

const IconButton = styled.button`
    display: flex;
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

const MenuIconButton = styled(IconButton)`
    ${MEDIA_QUERY_ONLY_PC} {
        display: none;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    flex: 1;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        display: block;
    }
`;

const SidePaneContainer = styled.aside<{ open: boolean }>`
    flex: 0 0 auto;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: ${(props) => (props.open ? rgba(COLOR_BLUEGREY_900, 0.6) : rgba(COLOR_BLUEGREY_900, 0))};
        transition: background 160ms linear;
        pointer-events: ${(props) => (props.open ? 'unset' : 'none')};
    }
`;

const SidePane = styled.div<{ open: boolean }>`
    display: block;
    position: relative;
    box-sizing: border-box;
    background: #fff;
    width: 320px;
    overflow: auto;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        width: calc(100vw - 96px);
        min-height: 100vh;
        box-shadow: ${BOX_SHADOW_LEVEL5};
        transition: transform 400ms ${EASING_EASE_OUT};
        transform: ${(props) => (props.open ? 'translateX(0%)' : 'translateX(-101%)')};
    }
`;

const SidePaneHeader = styled(Header)`
    ${MEDIA_QUERY_ONLY_PC} {
        display: none;
    }
    ${MEDIA_QUERY_ONLY_MOBILE} {
        ${Title} {
            display: block;
        }
    }
`;

const SidePaneBody = styled.div`
    padding: 32px 16px 32px;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        padding: 24px 16px 24px;
    }
`;

const Main = styled.main`
    flex: 1 1 auto;
    padding: 32px;
    position: relative;
    box-sizing: border-box;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        width: 100%;
        padding: 24px;
    }
`;

interface Props {
    items: SidePaneItemData[];
}

export function Layout(props: React.PropsWithChildren<Props>): React.ReactElement {
    const [isSidePaneOpened, setSidePaneOpened] = useState(false);

    return (
        <>
            <Header>
                <HeaderBlock>
                    <MenuIconButton onClick={() => setSidePaneOpened(!isSidePaneOpened)}>
                        <MenuIcon width={24} height={24} />
                    </MenuIconButton>
                    <Link href="/">
                        <Title>UIノート</Title>
                    </Link>
                </HeaderBlock>
                <HeaderBlock>
                    <a href="https://github.com/Kiikurage/ui-note" target="_blank" rel="noopener noreferrer">
                        <IconButton>
                            <GitHubIcon width={24} height={24} />
                        </IconButton>
                    </a>
                </HeaderBlock>
            </Header>
            <Body>
                <SidePaneContainer open={isSidePaneOpened} onClick={() => setSidePaneOpened(false)}>
                    <SidePane open={isSidePaneOpened} onClick={(ev) => ev.stopPropagation()}>
                        <SidePaneHeader>
                            <HeaderBlock>
                                <MenuIconButton onClick={() => setSidePaneOpened(!isSidePaneOpened)}>
                                    <MenuIcon width={24} height={24} />
                                </MenuIconButton>
                                <Link href="/">
                                    <Title>UIノート</Title>
                                </Link>
                            </HeaderBlock>
                        </SidePaneHeader>
                        <SidePaneBody>
                            {props.items.map((item) => (
                                <SidePaneItem key={item.path} item={item} />
                            ))}
                        </SidePaneBody>
                    </SidePane>
                </SidePaneContainer>
                <Main>{props.children}</Main>
            </Body>
        </>
    );
}

function SidePaneItem(props: { item: SidePaneItemData }): React.ReactElement {
    if (props.item.children.length > 0) {
        return (
            <SidePaneList title={props.item.title} href={props.item.path}>
                {props.item.children.map((child) => (
                    <SidePaneItem key={child.path} item={child} />
                ))}
            </SidePaneList>
        );
    } else {
        return <SidePaneListItem href={props.item.path}>{props.item.title}</SidePaneListItem>;
    }
}

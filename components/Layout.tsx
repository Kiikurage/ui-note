import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidePaneItemData } from '../model/SidePaneItemData';
import GitHubIcon from '../public/github.svg';
import MenuIcon from '../public/menu-24px.svg';
import PageIcon from './icons/Asset 4.svg';
import { Drawer } from './samples/Drawer';
import { SidePaneList, SidePaneListItem } from './SidePaneList';
import {
    BOX_SHADOW_LEVEL1,
    COLOR_BLUEGREY_700,
    FONT_WEIGHT_LIGHT,
    MEDIA_QUERY_ONLY_MOBILE,
    MEDIA_QUERY_ONLY_PC,
    MEDIA_QUERY_STRING_ONLY_MOBILE,
    MEDIA_QUERY_STRING_ONLY_PC,
} from './styles/styles';

const Base = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`;

const Title = styled.h1`
    color: inherit;
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
    background: ${COLOR_BLUEGREY_700};
    color: #fff;
    z-index: 1;
    box-sizing: border-box;
    flex: 0 0 auto;
    box-shadow: ${BOX_SHADOW_LEVEL1};

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
    opacity: 0.3;
    cursor: pointer;
    border: none;
    transition: opacity 100ms;
    padding: 8px;
    outline: none;

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

const StyledPageIcon = styled(PageIcon)`
    color: #fff;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        display: none;
    }
`;

const GitHubIconButton = styled(IconButton)`
    color: #fff;
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    min-height: 0;
    flex: 1 1 0;
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
    overflow: auto;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        width: 100%;
        padding: 24px;
    }
`;

interface Props {
    items: SidePaneItemData[];
}

export function Layout(props: React.PropsWithChildren<Props>): React.ReactElement {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handler = () => matchMedia(MEDIA_QUERY_STRING_ONLY_MOBILE).matches && setOpen(false);

        router.events.on('routeChangeStart', handler);
        return () => router.events.off('routeChangeStart', handler);
    }, [router.events, setOpen]);

    useEffect(() => {
        const handler = () => setOpen(matchMedia(MEDIA_QUERY_STRING_ONLY_PC).matches);
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return (
        <Base>
            <Header>
                <HeaderBlock>
                    <MenuIconButton onClick={() => setOpen(true)}>
                        <MenuIcon width={24} height={24} />
                    </MenuIconButton>
                    <StyledPageIcon width={36} height={36} />
                    <Link href="/">
                        <Title>UIノート</Title>
                    </Link>
                </HeaderBlock>
                <HeaderBlock>
                    <a href="https://github.com/Kiikurage/ui-note" target="_blank" rel="noopener noreferrer">
                        <GitHubIconButton>
                            <GitHubIcon width={24} height={24} />
                        </GitHubIconButton>
                    </a>
                </HeaderBlock>
            </Header>
            <Body>
                <Drawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                    <SidePaneHeader>
                        <HeaderBlock>
                            <MenuIconButton onClick={() => setOpen(false)}>
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
                </Drawer>
                <Main>{props.children}</Main>
            </Body>
        </Base>
    );
}

function SidePaneItem(props: { item: SidePaneItemData }): React.ReactElement {
    if (props.item.children.length > 0) {
        return (
            <SidePaneList title={props.item.title} href={props.item.path} selected={props.item.selected}>
                {props.item.children.map((child) => (
                    <SidePaneItem key={child.path} item={child} />
                ))}
            </SidePaneList>
        );
    } else {
        return (
            <SidePaneListItem href={props.item.path} selected={props.item.selected}>
                {props.item.title}
            </SidePaneListItem>
        );
    }
}

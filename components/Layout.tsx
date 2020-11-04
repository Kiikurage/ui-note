import Link from 'next/link';
import { useRouter } from 'next/router';
import { rgba } from 'polished';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { SidePaneItemData } from '../model/SidePaneItemData';
import GitHubIcon from '../public/github.svg';
import MenuIcon from '../public/menu-24px.svg';
import PageIcon from './icons/Asset 4.svg';
import { SidePaneList, SidePaneListItem } from './SidePaneList';
import {
    BOX_SHADOW_LEVEL1,
    BOX_SHADOW_LEVEL5,
    COLOR_BLUEGREY_700,
    COLOR_BLUEGREY_900,
    EASING_EASE_OUT,
    FONT_WEIGHT_LIGHT,
    MEDIA_QUERY_ONLY_MOBILE,
    MEDIA_QUERY_ONLY_PC,
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

const SidePaneContainer = styled.aside<{ open: boolean }>`
    flex: 0 0 auto;
    overflow: auto;

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
        will-change: background;
        pointer-events: ${(props) => (props.open ? 'unset' : 'none')};
    }
`;

const SidePaneTouchableArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 24px;
    bottom: 0;
    z-index: 999999999;

    ${MEDIA_QUERY_ONLY_PC} {
        display: none;
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
        will-change: transform;
        transform: ${(props) => (props.open ? 'translateX(0%)' : 'translateX(-100%)')};
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
    overflow: auto;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        width: 100%;
        padding: 24px;
    }
`;

interface Props {
    items: SidePaneItemData[];
}

function useTouchableAreaController(): [
    isSidePaneOpened: boolean,
    setSidePaneOpened: React.Dispatch<React.SetStateAction<boolean>>,
    touchableAreaRef: React.MutableRefObject<HTMLDivElement | null>,
    sidePaneRef: React.MutableRefObject<HTMLDivElement | null>,
    containerStyle: React.CSSProperties,
    paneStyle: React.CSSProperties
] {
    const [isSidePaneOpened, setSidePaneOpened] = useState(false);
    const [slideMode, setSlideMode] = useState<'SLIDE_IN' | 'SLIDE_OUT' | 'NONE' | 'UNKNOWN'>('NONE');
    const [dx, setDx] = useState(0);
    const isTouchUpdaterRequestedRef = useRef<boolean>(false);
    const sidePaneTouchableAreaRef = useRef<HTMLDivElement | null>();
    const sidePaneRef = useRef<HTMLDivElement | null>();
    const touchStartPositionScreenRef = useRef({ x: 0, y: 0 });

    const onSidePaneTouchableAreaTouchStart = useCallback((ev: TouchEvent) => {
        touchStartPositionScreenRef.current.x = ev.touches[0].screenX;
        setSlideMode('SLIDE_IN');
        ev.preventDefault();
    }, []);

    const onSidePaneTouchableAreaTouchMove = useCallback(
        (ev: TouchEvent) => {
            if (isSidePaneOpened || isTouchUpdaterRequestedRef.current) return;
            isTouchUpdaterRequestedRef.current = true;
            requestAnimationFrame(() => (isTouchUpdaterRequestedRef.current = false));

            setDx(ev.touches[0].screenX - touchStartPositionScreenRef.current.x);
        },
        [isSidePaneOpened]
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSidePaneTouchableAreaTouchEndMainRef = useRef(() => {});
    useEffect(() => {
        onSidePaneTouchableAreaTouchEndMainRef.current = () => {
            setSlideMode('NONE');
            setDx(0);

            const sidePane = sidePaneRef.current;
            if (!sidePane) return;
            const sidePaneWidth = sidePane.getBoundingClientRect().width;

            if (slideMode === 'SLIDE_IN' && dx > sidePaneWidth * 0.2) {
                setSidePaneOpened(true);
            }
        };
    }, [setDx, isSidePaneOpened, dx, setSidePaneOpened, slideMode]);
    const onSidePaneTouchableAreaTouchEnd = useCallback(() => onSidePaneTouchableAreaTouchEndMainRef.current(), []);

    const onSidePaneTouchStart = useCallback((ev: TouchEvent) => {
        touchStartPositionScreenRef.current.x = ev.touches[0].screenX;
        touchStartPositionScreenRef.current.y = ev.touches[0].screenY;
        setSlideMode('UNKNOWN');
    }, []);

    const onSidePaneTouchMove = useCallback(
        (ev: TouchEvent) => {
            if (!isSidePaneOpened || slideMode === 'NONE' || isTouchUpdaterRequestedRef.current) return;
            isTouchUpdaterRequestedRef.current = true;
            requestAnimationFrame(() => (isTouchUpdaterRequestedRef.current = false));

            const sidePane = sidePaneRef.current;
            if (!sidePane) return;
            const sidePaneWidth = sidePane.getBoundingClientRect().width;

            const dx = ev.touches[0].screenX - touchStartPositionScreenRef.current.x;
            const dy = ev.touches[0].screenY - touchStartPositionScreenRef.current.y;

            if (slideMode === 'UNKNOWN') {
                if (Math.abs(dy) > 12) {
                    setSlideMode('NONE');
                    setDx(sidePaneWidth);
                    return;
                }
                if (dx < -12) {
                    setSlideMode('SLIDE_OUT');
                }
            }

            setDx(dx);
        },
        [isSidePaneOpened, slideMode]
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSidePaneTouchEndMainRef = useRef(() => {});
    useEffect(() => {
        onSidePaneTouchEndMainRef.current = () => {
            setDx(0);
            setSlideMode('NONE');

            const sidePane = sidePaneRef.current;
            if (!sidePane) return;
            const sidePaneWidth = sidePane.getBoundingClientRect().width;

            if (slideMode === 'SLIDE_OUT' && dx < -sidePaneWidth * 0.2) {
                setSidePaneOpened(false);
            }
        };
    }, [setDx, isSidePaneOpened, dx, setSidePaneOpened, slideMode]);
    const onSidePaneTouchEnd = useCallback(() => onSidePaneTouchEndMainRef.current(), []);

    useLayoutEffect(() => {
        const sidePaneTouchableArea = sidePaneTouchableAreaRef.current;
        const sidePane = sidePaneRef.current;

        if (sidePaneTouchableArea !== null) {
            sidePaneTouchableArea.addEventListener('touchstart', onSidePaneTouchableAreaTouchStart, { passive: false });
            sidePaneTouchableArea.addEventListener('touchmove', onSidePaneTouchableAreaTouchMove);
            sidePaneTouchableArea.addEventListener('touchend', onSidePaneTouchableAreaTouchEnd);
        }
        if (sidePane !== null) {
            sidePane.addEventListener('touchstart', onSidePaneTouchStart, { passive: false });
            sidePane.addEventListener('touchmove', onSidePaneTouchMove);
            sidePane.addEventListener('touchend', onSidePaneTouchEnd);
        }

        return () => {
            if (sidePaneTouchableArea !== null) {
                sidePaneTouchableArea.removeEventListener('touchstart', onSidePaneTouchableAreaTouchStart);
                sidePaneTouchableArea.removeEventListener('touchmove', onSidePaneTouchableAreaTouchMove);
                sidePaneTouchableArea.removeEventListener('touchend', onSidePaneTouchableAreaTouchEnd);
            }
            if (sidePane !== null) {
                sidePane.removeEventListener('touchstart', onSidePaneTouchStart);
                sidePane.removeEventListener('touchmove', onSidePaneTouchMove);
                sidePane.removeEventListener('touchend', onSidePaneTouchEnd);
            }
        };
    }, [
        onSidePaneTouchableAreaTouchStart,
        onSidePaneTouchableAreaTouchMove,
        onSidePaneTouchableAreaTouchEnd,
        onSidePaneTouchStart,
        onSidePaneTouchMove,
        onSidePaneTouchEnd,
    ]);

    const containerStyle = useMemo<React.CSSProperties>(() => {
        if (dx === 0) return {};

        const sidePane = sidePaneRef.current;
        if (sidePane === null) return;

        const sidePaneWidth = sidePane.getBoundingClientRect().width;

        if (slideMode === 'SLIDE_IN') {
            return { background: rgba(COLOR_BLUEGREY_900, 0.6 * Math.min(Math.max(dx / sidePaneWidth, 0), 1)), transition: 'none' };
        } else if (slideMode === 'SLIDE_OUT') {
            return {
                background: rgba(COLOR_BLUEGREY_900, 0.6 * Math.min(Math.max((sidePaneWidth - dx) / sidePaneWidth, 0), 1)),
                transition: 'none',
            };
        }
    }, [dx, slideMode]);

    const paneStyle = useMemo<React.CSSProperties>(() => {
        if (dx === 0) return {};

        const sidePane = sidePaneRef.current;
        if (sidePane === null) return;

        const sidePaneWidth = sidePane.getBoundingClientRect().width;

        if (slideMode === 'SLIDE_IN') {
            return {
                transform: `translateX(${Math.max(-sidePaneWidth, Math.min(-sidePaneWidth + dx, 0))}px`,
                transition: 'none',
            };
        } else if (slideMode === 'SLIDE_OUT' || slideMode === 'UNKNOWN') {
            return {
                transform: `translateX(${Math.max(-sidePaneWidth, Math.min(dx, 0))}px`,
                transition: 'none',
            };
        }
    }, [dx, slideMode]);

    return [isSidePaneOpened, setSidePaneOpened, sidePaneTouchableAreaRef, sidePaneRef, containerStyle, paneStyle];
}

export function Layout(props: React.PropsWithChildren<Props>): React.ReactElement {
    const [isSidePaneOpened, setSidePaneOpened, touchableAreaRef, sidePaneRef, containerStyle, paneStyle] = useTouchableAreaController();
    const router = useRouter();

    useEffect(() => {
        const handler = () => setSidePaneOpened(false);

        router.events.on('routeChangeStart', handler);
        return () => router.events.off('routeChangeStart', handler);
    }, [router.events, setSidePaneOpened]);

    return (
        <Base>
            <Header>
                <HeaderBlock>
                    <MenuIconButton onClick={() => setSidePaneOpened(!isSidePaneOpened)}>
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
                <SidePaneContainer open={isSidePaneOpened} onClick={() => setSidePaneOpened(false)} style={containerStyle}>
                    <SidePane
                        open={isSidePaneOpened}
                        onClick={(ev) => ev.stopPropagation()}
                        style={paneStyle}
                        ref={(e) => (sidePaneRef.current = e)}
                    >
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
                <SidePaneTouchableArea ref={(e) => (touchableAreaRef.current = e)} />
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

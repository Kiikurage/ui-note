import { rgba } from 'polished';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFormState } from '../hooks/useFormState';
import { BOX_SHADOW_LEVEL5, COLOR_BLUEGREY_900, EASING_EASE_OUT, MEDIA_QUERY_ONLY_MOBILE, MEDIA_QUERY_ONLY_PC } from '../styles/styles';

const Wrapper = styled.div<{ open: boolean }>`
    position: relative;
    flex: 0 0 auto;
    overflow: auto;
    width: ${(props) => (props.open ? 320 : 0)}px;
    transition: width 160ms ${EASING_EASE_OUT};

    ${MEDIA_QUERY_ONLY_MOBILE} {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 1;
        background: ${(props) => (props.open ? rgba(COLOR_BLUEGREY_900, 0.6) : rgba(COLOR_BLUEGREY_900, 0))};
        transition: background 160ms linear;
        will-change: background;
        pointer-events: ${(props) => (props.open ? 'unset' : 'none')};
    }
`;

const Body = styled.div<{ open: boolean }>`
    top: 0;
    left: 0;
    bottom: 0;
    display: block;
    position: absolute;
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
    width: 320px;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: calc(100% - 96px);
        box-shadow: ${BOX_SHADOW_LEVEL5};
        transition: transform 400ms ${EASING_EASE_OUT};
        will-change: transform;
        transform: ${(props) => (props.open ? 'translateX(0)' : `translateX(-101%)`)};
    }
`;

const DrawerKnob = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    bottom: 0;
    pointer-events: all;

    ${MEDIA_QUERY_ONLY_PC} {
        display: none;
    }
`;

interface Props {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export function Drawer(props: React.PropsWithChildren<Props>): React.ReactElement {
    const { onOpen, onClose } = props;
    const [open, setOpen] = useFormState(false, props.open);
    const [slideMode, setSlideMode] = useState<'SLIDE_IN' | 'SLIDE_OUT' | 'NONE' | 'UNKNOWN'>('NONE');
    const [dx, setDx] = useState(0);
    const isTouchUpdaterRequestedRef = useRef<boolean>(false);
    const touchStartScreenPositionRef = useRef({ x: 0, y: 0 });

    const bodyRef = useRef<HTMLDivElement | null>();
    const getBodyWidth = useCallback(() => bodyRef.current?.getBoundingClientRect()?.width || 1, []);

    const onKnobTouchStart = useCallback((ev: TouchEvent) => {
        touchStartScreenPositionRef.current.x = ev.touches[0].screenX;
        setSlideMode('SLIDE_IN');
        ev.preventDefault();
    }, []);

    const onKnobTouchMove = useCallback(
        (ev: React.TouchEvent) => {
            if (open || isTouchUpdaterRequestedRef.current) return;
            isTouchUpdaterRequestedRef.current = true;
            requestAnimationFrame(() => (isTouchUpdaterRequestedRef.current = false));

            setDx(ev.touches[0].screenX - touchStartScreenPositionRef.current.x);
        },
        [open]
    );

    const onKnobTouchEnd = useCallback(() => {
        setSlideMode('NONE');
        setDx(0);

        if (slideMode === 'SLIDE_IN' && dx > getBodyWidth() * 0.2) {
            onOpen?.();
            setOpen(true);
        }
    }, [dx, getBodyWidth, onOpen, setOpen, slideMode]);

    const onBodyTouchStart = useCallback((ev: TouchEvent) => {
        touchStartScreenPositionRef.current.x = ev.touches[0].screenX;
        touchStartScreenPositionRef.current.y = ev.touches[0].screenY;
        setSlideMode('UNKNOWN');
    }, []);

    const onBodyTouchMove = useCallback(
        (ev: React.TouchEvent) => {
            if (!open || slideMode === 'NONE' || isTouchUpdaterRequestedRef.current) return;
            isTouchUpdaterRequestedRef.current = true;
            requestAnimationFrame(() => (isTouchUpdaterRequestedRef.current = false));

            const dx = ev.touches[0].screenX - touchStartScreenPositionRef.current.x;
            const dy = ev.touches[0].screenY - touchStartScreenPositionRef.current.y;

            if (slideMode === 'UNKNOWN') {
                if (Math.abs(dy) > 12) {
                    setSlideMode('NONE');
                    setDx(getBodyWidth());
                    return;
                }
                if (dx < -12) {
                    setSlideMode('SLIDE_OUT');
                }
            }

            setDx(dx);
        },
        [getBodyWidth, open, slideMode]
    );

    const onBodyTouchEnd = useCallback(() => {
        setDx(0);
        setSlideMode('NONE');

        if (slideMode === 'SLIDE_OUT' && dx < -getBodyWidth() * 0.2) {
            onClose?.();
            setOpen(false);
        }
    }, [dx, getBodyWidth, onClose, setOpen, slideMode]);

    const wrapperStyle = useMemo<React.CSSProperties>(() => {
        if (dx === 0) return {};
        const bodyWidth = getBodyWidth();

        if (slideMode === 'SLIDE_IN') {
            return { background: rgba(COLOR_BLUEGREY_900, 0.6 * Math.min(Math.max(dx / bodyWidth, 0), 1)), transition: 'none' };
        } else if (slideMode === 'SLIDE_OUT') {
            return {
                background: rgba(COLOR_BLUEGREY_900, 0.6 * Math.min(Math.max((bodyWidth - dx) / bodyWidth, 0), 1)),
                transition: 'none',
            };
        }
    }, [dx, getBodyWidth, slideMode]);

    const bodyStyle = useMemo<React.CSSProperties>(() => {
        if (dx === 0) return {};
        const bodyWidth = getBodyWidth();

        if (slideMode === 'SLIDE_IN') {
            return {
                transform: `translateX(${Math.max(-bodyWidth - 10, Math.min(-bodyWidth + dx, 0))}px`,
                transition: 'none',
            };
        } else if (slideMode === 'SLIDE_OUT' || slideMode === 'UNKNOWN') {
            return {
                transform: `translateX(${Math.max(-bodyWidth - 10, Math.min(dx, 0))}px`,
                transition: 'none',
            };
        }
    }, [dx, getBodyWidth, slideMode]);

    const knobRef = useRef<HTMLDivElement | null>();
    useLayoutEffect(() => {
        const knob = knobRef.current;
        knob?.addEventListener('touchstart', onKnobTouchStart, { passive: false });
        return () => knob?.removeEventListener('touchstart', onKnobTouchStart);
    }, [onKnobTouchStart]);

    useLayoutEffect(() => {
        const body = bodyRef.current;
        body?.addEventListener('touchstart', onBodyTouchStart, { passive: false });
        return () => body?.removeEventListener('touchstart', onBodyTouchStart);
    }, [onBodyTouchStart]);

    return (
        <Wrapper
            open={open}
            onClick={() => {
                onClose?.();
                setOpen(false);
            }}
            style={wrapperStyle}
        >
            <DrawerKnob ref={(e) => (knobRef.current = e)} onTouchMove={onKnobTouchMove} onTouchEnd={onKnobTouchEnd} />
            <Body
                open={open}
                onClick={(ev) => ev.stopPropagation()}
                style={bodyStyle}
                ref={(e) => (bodyRef.current = e)}
                onTouchMove={onBodyTouchMove}
                onTouchEnd={onBodyTouchEnd}
            >
                {props.children}
            </Body>
        </Wrapper>
    );
}

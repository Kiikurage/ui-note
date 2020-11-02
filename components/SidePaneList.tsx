import Link from 'next/link';
import { rgba } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from './icons/arrow_right.svg';
import { COLOR_BLUEGREY_200, COLOR_BLUEGREY_400, COLOR_PRIMARY, FONT_WEIGHT_NORMAL, MEDIA_QUERY_ONLY_MOBILE } from './styles/styles';

const Base = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`;

const ItemBase = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    line-height: 32px;
    padding: 0 16px 0 32px;
    border-radius: 16px;
    user-select: none;
    flex: 1;
    transition: background 60ms ease-out;
    cursor: pointer;
    color: ${(props) => (props.selected ? COLOR_PRIMARY : 'inherit')};
    background: ${(props) => (props.selected ? rgba(COLOR_PRIMARY, 0.07) : 'transparent')};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    min-width: 0;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        line-height: 48px;
        padding: 0 24px 0 48px;
        border-radius: 24px;
    }

    &:hover {
        background: ${(props) => (props.selected ? rgba(COLOR_PRIMARY, 0.12) : rgba(COLOR_BLUEGREY_200, 0.2))};
    }

    &:active {
        background: ${(props) => (props.selected ? rgba(COLOR_PRIMARY, 0.15) : rgba(COLOR_BLUEGREY_200, 0.3))};
    }
`;

const Header = styled(ItemBase)<{ expanded: boolean }>`
    font-weight: ${FONT_WEIGHT_NORMAL};
    padding-left: 0;

    svg {
        fill: ${COLOR_BLUEGREY_400};
        transition: transform 60ms ease-out;
        transform: ${(props) => (props.expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
    }
`;

const IconButton = styled.button`
    outline: none;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        width: 48px;
        height: 48px;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    & {
        margin-left: 32px;
        box-sizing: border-box;
    }
`;

interface Props {
    href?: string;
    title: string;
}

export function SidePaneList(props: React.PropsWithChildren<Props>): React.ReactElement {
    const [expanded, setExpanded] = useState(true);

    return (
        <Base>
            <Link href={props.href}>
                <Header expanded={expanded} selected={false}>
                    <IconButton
                        onClick={(ev) => {
                            ev.stopPropagation();
                            setExpanded(!expanded);
                        }}
                    >
                        <ArrowIcon width={20} height={20} />
                    </IconButton>
                    {props.title}
                </Header>
            </Link>
            {expanded && <Body>{props.children}</Body>}
        </Base>
    );
}

interface ItemProps {
    href?: string;
    selected?: boolean;
}

export function SidePaneListItem(props: React.PropsWithChildren<ItemProps>): React.ReactElement {
    return (
        <Link href={props.href}>
            <ItemBase selected={props.selected}>{props.children}</ItemBase>
        </Link>
    );
}

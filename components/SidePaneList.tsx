import Link from 'next/link';
import { rgba } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from './icons/arrow_right.svg';
import { COLOR_BLUEGREY_100, COLOR_BLUEGREY_200, COLOR_BLUEGREY_400, COLOR_PRIMARY, FONT_WEIGHT_NORMAL } from './styles/styles';

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
    line-height: 24px;
    padding: 0 8px 0 24px;
    border-radius: 12px;
    user-select: none;
    flex: 1;
    transition: background 60ms ease-out;
    cursor: pointer;
    color: ${(props) => (props.selected ? COLOR_PRIMARY : 'inherit')};
    background: ${(props) => (props.selected ? rgba(COLOR_PRIMARY, 0.07) : 'transparent')};
    gap: 4px;

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
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    &:active {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 4px;
    margin-top: 4px;

    & {
        margin-left: 9px;
        padding-left: 8px;
        // border-left: 1px solid ${COLOR_BLUEGREY_100};
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

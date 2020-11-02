import React from 'react';
import styled from 'styled-components';
import { SidePaneItemData } from '../model/SidePaneItemData';
import { SidePaneList, SidePaneListItem } from './SidePaneList';

const Base = styled.aside`
    width: 280px;
    flex: 0 0 auto;
    box-sizing: border-box;
    padding: 32px 32px;
`;

interface Props {
    items: SidePaneItemData[];
}

export function SidePane(props: Props): React.ReactElement {
    return (
        <Base>
            {props.items.map((item) => (
                <SidePaneItem key={item.path} item={item} />
            ))}
        </Base>
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

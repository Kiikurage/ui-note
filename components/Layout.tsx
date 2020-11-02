import React from 'react';
import styled from 'styled-components';
import { SidePaneItemData } from '../model/SidePaneItemData';
import { SidePane } from './SidePane';
import { SiteHeader } from './SiteHeader';

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    flex: 1;
    min-height: calc(100vh - 57px);
`;

const Main = styled.main`
    flex: 1 1 auto;
    padding: 32px;
`;

interface Props {
    items: SidePaneItemData[];
}

export function Layout(props: React.PropsWithChildren<Props>): React.ReactElement {
    return (
        <>
            <SiteHeader />
            <Body>
                <SidePane items={props.items} />
                <Main>{props.children}</Main>
            </Body>
        </>
    );
}

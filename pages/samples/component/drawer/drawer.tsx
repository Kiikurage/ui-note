import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from '../../../../components/Helmet';
import { Button } from '../../../../components/samples/Button';
import { Drawer } from '../../../../components/samples/Drawer';

const Base = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
`;

const DrawerInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 16px 16px;
    gap: 16px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
`;

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export default function RoundButtonSample(): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Helmet title="Drawer - UIノート" description="Drawerのサンプル" />
            <Base>
                <Drawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                    <DrawerInner>
                        <p>Hello, I am Drawer!</p>
                        <Button onClick={() => setOpen(false)}>CLOSE</Button>
                    </DrawerInner>
                </Drawer>
                <Main>
                    <Button onClick={() => setOpen(true)}>OPEN</Button>
                </Main>
            </Base>
        </>
    );
}

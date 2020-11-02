import React from 'react';
import styled from 'styled-components';

const Base = styled.main`
    padding: 32px 32px;
    background: #1565c0;
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export function SamplePageBase(props: React.PropsWithChildren<unknown>): React.ReactElement {
    return <Base>{props.children}</Base>;
}

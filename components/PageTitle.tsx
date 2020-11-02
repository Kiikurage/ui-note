import React from 'react';
import styled from 'styled-components';
import { FONT_WEIGHT_LIGHT } from './styles/styles';

const Base = styled.h2`
    font-size: 32px;
    margin: 0 0 32px;
    font-weight: ${FONT_WEIGHT_LIGHT};
`;

export function PageTitle(props: React.PropsWithChildren<unknown>): React.ReactElement {
    return <Base>{props.children}</Base>;
}

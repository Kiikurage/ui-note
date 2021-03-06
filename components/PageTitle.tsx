import React from 'react';
import styled from 'styled-components';
import { COLOR_PRIMARY, FONT_WEIGHT_LIGHT, MEDIA_QUERY_ONLY_MOBILE } from './styles/styles';

const Base = styled.h2`
    font-size: 32px;
    margin: 0 0 32px;
    font-weight: ${FONT_WEIGHT_LIGHT};
    color: ${COLOR_PRIMARY};

    ${MEDIA_QUERY_ONLY_MOBILE} {
        margin: 0 0 24px;
    }
`;

export function PageTitle(props: React.PropsWithChildren<unknown>): React.ReactElement {
    return <Base>{props.children}</Base>;
}

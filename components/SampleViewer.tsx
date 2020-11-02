import React from 'react';
import styled from 'styled-components';

const Base = styled.iframe`
    position: relative;
    border: none;
    min-height: 180px;
    width: 100%;
`;

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export function SampleViewer(props: Props): React.ReactElement {
    return <Base {...props} />;
}

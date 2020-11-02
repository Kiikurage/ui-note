import React from 'react';
import styled from 'styled-components';

const Base = styled.iframe`
    position: relative;
    border: none;
    width: 100%;
    min-height: 120px;
    border-radius: 4px;
    overflow: visible;
`;

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export function SampleViewer(props: Props): React.ReactElement {
    return <Base {...props} />;
}

import React from 'react';
import styled from 'styled-components';
import { COLOR_BLUEGREY_600 } from './styles/styles';

const Base = styled.div`
    position: relative;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    height: 160px;
`;

const Label = styled.header`
    z-index: 1;
    padding: 4px 8px;
    font-size: 0.8em;
    color: ${COLOR_BLUEGREY_600};
`;

const IFrame = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    min-height: unset;
`;

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export function SampleViewer(props: Props): React.ReactElement {
    const { src } = props;

    const query: Record<string, string> = (src.split('?')[1] ?? '').split('&').reduce((query, keyAndValue) => {
        const [key, value] = keyAndValue.split('=');
        query[key] = value;
        return query;
    }, {} as Record<string, string>);

    return (
        <Base>
            <Label>{props.title}</Label>
            <IFrame loading="lazy" {...props} width={query['width'] || ''} height={query['height'] || ''} />
        </Base>
    );
}

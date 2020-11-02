import React from 'react';
import styled from 'styled-components';
import { SamplePageBase } from '../../components/SamplePageBase';
import { BOX_SHADOW_LEVEL1 } from '../../components/styles/styles';

const Inner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
`;

const Card = styled.div`
    background: #fff;
    border-radius: 2px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: ${BOX_SHADOW_LEVEL1};
    gap: 4px;
`;

const Button = styled.button`
    background: #e8e8e8;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    line-height: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px 32px;
    margin: 0;
    cursor: pointer;
    outline: none;
    white-space: nowrap;

    &:focus {
        outline: 1px solid rgba(0, 0, 0, 0.5);
        outline-offset: 2px;
    }
    &:hover {
        background: #bbb;
    }
    &:active {
        background: #aaa;
    }
`;

const InlineButton = styled(Button)`
    background: transparent;

    &:focus {
        outline: 1px solid rgba(0, 0, 0, 0.5);
        outline-offset: 2px;
    }
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    &:active {
        background: rgba(0, 0, 0, 0.15);
    }
`;

export default function ButtonSample(): React.ReactElement {
    return (
        <SamplePageBase>
            <Inner>
                <Card>
                    <Button>Button</Button>
                    <InlineButton>Inline Button</InlineButton>
                </Card>
            </Inner>
        </SamplePageBase>
    );
}

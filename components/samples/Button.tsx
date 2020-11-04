import { lighten } from 'polished';
import styled from 'styled-components';
import { COLOR_GREEN_700, MEDIA_QUERY_ONLY_MOBILE } from '../styles/styles';

export const Button = styled.button`
    background: ${COLOR_GREEN_700};
    color: #fff;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    line-height: 1;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    margin: 0;
    cursor: pointer;
    white-space: nowrap;
    height: 36px;
    min-width: 96px;
    transition: background 100ms linear;

    ${MEDIA_QUERY_ONLY_MOBILE} {
        height: 48px;
    }

    &:hover {
        background: ${lighten(0.1, COLOR_GREEN_700)};
    }
    &:active {
        transition: background 0ms;
        background: ${lighten(0.25, COLOR_GREEN_700)};
    }
`;

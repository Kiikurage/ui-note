import { rgba } from 'polished';
import styled from 'styled-components';
import { COLOR_GREEN_700 } from '../styles/styles';
import { Button } from './Button';

export const TextButton = styled(Button)`
    background: none;
    font: inherit;
    color: ${COLOR_GREEN_700};

    &:hover {
        background: ${rgba(COLOR_GREEN_700, 0.1)};
    }
    &:active {
        transition: background 0ms;
        background: ${rgba(COLOR_GREEN_700, 0.2)};
    }
`;

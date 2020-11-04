import styled from 'styled-components';
import { BOX_SHADOW_LEVEL1 } from '../styles/styles';

export const Card = styled.div`
    background: #fff;
    border-radius: 2px;
    display: inline-flex;
    padding: 8px 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: ${BOX_SHADOW_LEVEL1};
    gap: 4px;
`;

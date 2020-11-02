import { AppProps } from 'next/app';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { COLOR_BLUEGREY_900 } from '../components/styles/styles';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 100vh;
        color: ${COLOR_BLUEGREY_900};
        font-size: 14px;
        line-height: 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
`;

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

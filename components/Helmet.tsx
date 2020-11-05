import Head from 'next/head';
import React, { useEffect } from 'react';
import { COLOR_BLUEGREY_700 } from './styles/styles';

interface Props {
    title: string;
    description: string;
}

function SWRegister(): React.ReactElement {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            void navigator.serviceWorker.register('/sw.js');
        }
    }, []);

    return null;
}

export function Helmet(props: React.PropsWithChildren<Props>): React.ReactElement {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
                <link rel="manifest" href="/manifest.json" />
                <title>{props.title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content={COLOR_BLUEGREY_700} />
                <meta name="description" content={props.description} />
                <meta property="og:title" content={props.title} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ui-note.vercel.app/favicon.svg" />
                <meta property="og:site_name" content="UIノート" />
                <meta property="og:description" content={props.description} />
                {props.children}
            </Head>
            <SWRegister />
        </>
    );
}

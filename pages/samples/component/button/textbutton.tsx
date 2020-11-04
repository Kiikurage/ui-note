import React from 'react';
import { Helmet } from '../../../../components/Helmet';
import { SamplePageBase } from '../../../../components/SamplePageBase';
import { TextButton } from '../../../../components/samples/TextButton';

export default function RoundButtonSample(): React.ReactElement {
    return (
        <>
            <Helmet title="TextButton - UIノート" description="TextButtonのサンプル" />
            <SamplePageBase>
                <TextButton>SUBMIT</TextButton>
            </SamplePageBase>
        </>
    );
}

import React from 'react';
import { Helmet } from '../../../../components/Helmet';
import { SamplePageBase } from '../../../../components/SamplePageBase';
import { Button } from '../../../../components/samples/Button';
import { TextButton } from '../../../../components/samples/TextButton';

export default function RoundButtonSample(): React.ReactElement {
    return (
        <>
            <Helmet title="Buttons - UIノート" description="Buttonのサンプル" />
            <SamplePageBase>
                <Button>FILLED</Button>
                <TextButton>TEXT</TextButton>
            </SamplePageBase>
        </>
    );
}

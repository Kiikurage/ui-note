import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useFormState<T>(defaultValue: T, value?: T): [T, Dispatch<SetStateAction<T>>] {
    const [stateValue, setStateValue] = useState(defaultValue);

    useEffect(() => {
        setStateValue(defaultValue);
    }, [defaultValue]);
    useEffect(() => {
        if (value !== undefined) {
            setStateValue(value);
        }
    }, [value]);

    return [value === undefined ? stateValue : value, setStateValue];
}

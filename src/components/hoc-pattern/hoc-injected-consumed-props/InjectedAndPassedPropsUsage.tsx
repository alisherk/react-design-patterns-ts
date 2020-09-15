import React from 'react';
import { Counter } from './Counter'; 
import { makeCounter } from './MakeCounter';

const WrappedCounter = makeCounter(Counter); 

export const InjectedAndPassedPropsUsage = () => (
    < WrappedCounter minValue={0} maxValue={10} style={{ color: 'black'}} />
);


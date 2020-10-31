import React from 'react';
import { Counter } from './Counter'; 
import { makeCounter } from './makeCounter'; 

const WrappedCounter = makeCounter(Counter); 

export const InjectedAndPassedPropsUsageFC = () => <WrappedCounter maxValue={10} minValue={0} />


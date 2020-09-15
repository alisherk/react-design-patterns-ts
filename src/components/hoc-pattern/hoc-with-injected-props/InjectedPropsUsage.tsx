import React from 'react';
import { makeCounter } from './MakeCounter';
import { Counter } from './Counter';

const WrappedCounter = makeCounter(Counter);

export const InjectedPropsUsage = () => {
  return <WrappedCounter style={{ color: 'red'}} />;
};



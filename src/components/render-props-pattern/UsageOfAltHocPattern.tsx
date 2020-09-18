import React from 'react';
import { withAmount } from './HocAltToRenderProp';


interface Props {
    amount: number;
  }
  
  const Pound = ({ amount }: Props) => (
    <p>
      <span> In Pounds </span> <span> {amount} </span>{' '}
    </p>
  );
  const Euro = ({ amount }: Props) => (
    <p>
      <span> In Euros </span> <span> {amount} </span>{' '}
    </p>
  );
  
const ComponentsWithAmount = withAmount([Pound, Euro])

export const UsageOfAltHocPattern = () => <ComponentsWithAmount />


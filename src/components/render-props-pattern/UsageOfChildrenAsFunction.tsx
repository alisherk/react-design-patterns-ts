import React from 'react';
import { Amount } from './AmountWithChildrenAsFunc';

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

export const UsageOfChildrenAsFunction = () => {
  return (
    <Amount>
      {(amount) => (
        <div>
          <Pound amount={amount} />
          <Euro amount={amount} />
        </div>
      )}
    </Amount>
  );
};



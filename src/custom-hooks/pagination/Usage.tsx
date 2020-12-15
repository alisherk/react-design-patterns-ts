import React from 'react';
import { usePagination } from './usePagination';

const data = [
  {
    id: 1,
    value: 'Tab',
  },
  {
    id: 2,
    value: 'Shab',
  },
  {
    id: 3,
    value: 'Hab',
  },
  {
    id: 4,
    value: 'Tony',
  },
  {
    id: 5,
    value: 'Dabby',
  },
  {
    id: 6,
    value: 'Gabby',
  },
  {
    id: 7,
    value: 'Goddy',
  },
  {
    id: 8,
    value: 'Tony',
  },
  {
    id: 9,
    value: 'Fonny',
  },
  {
    id: 10,
    value: 'Honny',
  },
  {
    id: 11,
    value: 'Don',
  },
  {
    id: 12,
    value: 'Hon',
  },
  {
    id: 13,
    value: 'Jonny',
  },
  {
    id: 14,
    value: 'Dan',
  },
  {
    id: 15,
    value: 'Pam',
  },
  {
    id: 16,
    value: 'Ham',
  },
  {
    id: 17,
    value: 'Jon',
  },
  {
    id: 18,
    value: 'Yom',
  },
];

export const Usage = () => {
  const { currentData, next, prev } = usePagination(data, 2);
  return (
    <div>
      {currentData()?.map((item) => (
        <p key={item.id}> {item.value} </p>
      ))}
      <button onClick={prev}>Prev</button>
      <br/>
      <button onClick={next}>Next</button>

    </div>
  );
};

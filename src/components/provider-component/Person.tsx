import React from 'react';
import { IPerson } from './PeopleDataProvider';

const Person: React.FC<IPerson> = ({ name, age, birthyear }) => {
  return (
    <div>
      <p>
        My name is {name}. I am {age} old. I was born in {birthyear}
      </p>
    </div>
  );
};

export default Person; 


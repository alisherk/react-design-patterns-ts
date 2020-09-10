import React from 'react';
import RadioInputFormFC from './RadioInputFormFC';

export const CompoundComponentUsage = () => {

  const [, setValue] = React.useState('');
  
  const onChangeForClass = (value: string): void => {
    setValue(value);
  };

  return (
    <RadioInputFormFC defaultValue='10' onStateChange={onChangeForClass}>
      <RadioInputFormFC.RadioInput value='10' />
      <RadioInputFormFC.RadioInput value='20' />
    </RadioInputFormFC>
  );
};

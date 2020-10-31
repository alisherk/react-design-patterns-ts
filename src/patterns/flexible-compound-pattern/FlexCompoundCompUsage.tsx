import React from 'react';
import RadioInputFormClass from './RadioInputFormClass';

function SubmitButton() {
  const onSubmit = (value: string): void => {
    alert(`Submitted: ${value}`);
  };
  return <RadioInputFormClass.SubmitButton onSubmit={onSubmit} />;
}

export const FlexCompoundCompUsage = () => {

  const [, setValue] = React.useState('');

  const onChange = (value: string): void => {
    setValue(value);
  };
  
  return (
      <RadioInputFormClass onStateChange={onChange}>
        <div>
        <div>
          <RadioInputFormClass.CurrentValue />
        </div>
          <RadioInputFormClass.RadioInput
            label='one'
            value='1'
            name='numbers'
          />
          <RadioInputFormClass.RadioInput
            label='two'
            value='2'
            name='numbers'
          />
        </div>
        <div>
          <SubmitButton />
        </div>

      </RadioInputFormClass>
  )
};



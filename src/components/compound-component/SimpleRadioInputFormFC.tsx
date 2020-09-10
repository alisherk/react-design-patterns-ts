import React from 'react';

interface Props {
  name?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  children: React.ReactNode;
}

interface RadioInputProps {
  value: string;
  [key: string]: any;
}

interface StaticRadioInput {
  RadioInput: React.FC<RadioInputProps>;
}

export const RadioList = ({
  name,
  onChange,
  children,
}: React.PropsWithChildren<Props> & StaticRadioInput): JSX.Element => {
  return (
    <form>
      {React.Children.map(
        children as React.ReactElement[],
        (child: React.ReactElement) =>
          React.cloneElement(child, {
            name,
            onChange,
          })
      )}
    </form>
  );
};

const RadioInput = ({ value, ...props }: RadioInputProps): JSX.Element => (
  <label>
    <input type='radio' value={value} {...props} />
    {value}
  </label>
);

RadioList.RadioInput = RadioInput;

import * as React from 'react';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
}

interface State {
  currentValue: string;
  defaultValue?: string;
}

interface RadioInputProps {
  value: string;
  currentValue?: string;
  defaultValue?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

const RadioImageForm = ({
  children,
  onStateChange,
  defaultValue,
}: React.PropsWithChildren<Props>): React.ReactElement => {

  const [state, setState] = React.useState<State>({
    currentValue: '',
    defaultValue,
  });

  // Memoized so that providerState isn't recreated on each render
  const providerState = React.useMemo(
    () => ({
      onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setState({
          currentValue: value,
        });
        onStateChange?.(value);
      },
      ...state,
    }),
    [state, onStateChange]
  );

  return (
    <form>
      {
        // So here we can take all children and make a copy of them that has those props.
        React.Children.map(
          children as React.ReactElement[],
          (child: React.ReactElement) =>
            // Clone and return a new React element using element as the starting point.
            // The resulting element will have the original element’s props with the
            // new props merged in shallowly. New children will replace existing children.
            React.cloneElement(child, {
              ...providerState,
            })
        )
      }
    </form>
  );
};

const RadioInput = ({
  currentValue,
  onChange,
  value,
  defaultValue
}: RadioInputProps): React.ReactElement => (
  <label>
    <input
      type='radio'
      value={value}
      onChange={onChange}
      checked={defaultValue === value || currentValue === value}
      aria-checked={currentValue === value}
    />
    {value}
  </label>
);

RadioImageForm.RadioInput = RadioInput;

export default RadioImageForm;

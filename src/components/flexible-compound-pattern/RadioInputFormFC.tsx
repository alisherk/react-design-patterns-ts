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
  label: string;
  value: string;
  name: string;
}

interface SubmitButtonProps {
  onSubmit?(value: string): void;
}

interface ProviderState extends State {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

// Create a RadioInputContext with React.createContext
const RadioInputFormContext = React.createContext<ProviderState>({
  currentValue: '',
  defaultValue: undefined,
  onChange: () => {},
});


const RadioInputForm = ({
  children,
  defaultValue = '',
  onStateChange,
}: React.PropsWithChildren<Props>) => {
  const [state, setState] = React.useState<State>({
    currentValue: '',
    defaultValue,
  });

  // memoized state isn't recreated on each render
  const memoizedState = React.useMemo(
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
  // When this value changes to something else it will re-render itself and all of its consumers.
  // This could be a performance problem.
  // e.g.<RadioInputFormContext.Provider value={state}> Instead pass the memoized state

  return (
    <RadioInputFormContext.Provider value={memoizedState}>
      {children}
    </RadioInputFormContext.Provider>
  );
};

const RadioInput = ({
  label,
  value,
  name,
}: RadioInputProps): React.ReactElement => {
  const { currentValue, onChange } = React.useContext(RadioInputFormContext);

  return (
    <label key={value}>
      <input
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        checked={currentValue === value}
      />
      {label}
    </label>
  );
};

const SubmitButton = ({ onSubmit }: SubmitButtonProps): React.ReactElement => {
  const { currentValue } = React.useContext(RadioInputFormContext);

  return (
    <button
      type='button'
      onClick={() => onSubmit?.(currentValue)}
      disabled={!currentValue}
    >
      Submit
    </button>
  );
};

const CurrentValue = (): React.ReactElement => {
  const { currentValue } = React.useContext(RadioInputFormContext);

  return (
    <>
      {!!currentValue && (
        <div>
          <h1>Current Value: {currentValue}</h1>
        </div>
      )}
    </>
  );
};


RadioInputForm.RadioInput = RadioInput;
RadioInputForm.SubmitButton = SubmitButton;
RadioInputForm.CurrentValue = CurrentValue;


export default RadioInputForm;

import * as React from 'react';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
}

interface State {
  currentValue: string;
  defaultValue?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface RadioInputProps {
  label: string;
  value: string;
  name: string;
}

interface SubmitButtonProps {
  onSubmit?(value: string): void;
}

// Create a RadioImageFormContext with React.createContext
const RadioInputFormContext = React.createContext({
  currentValue: '',
  defaultValue: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
});
// Context object accepts a displayName string property.
// React DevTools uses this string to determine what to display
// for the context.
RadioInputFormContext.displayName = 'RadioInputForm';

/**
 * 
 *  1. RadioImageForm - the parent component that manages the entire state
 * 	2. RadioInput - Next, the user can start adding their radio inputs 
 * with the `RadioInput` compound component. A subset component of RadioImageForm. 
 * In the `RadioInput` component, we have abstracted the implementation details of the radio input element, 
 * where the parent component, RadioImageForm, deals with the onChange event actions and updating 
 * the currently checked radio input.
 * 
 * @props {(e: string): void;} [onStateChange] 
 * @props {string} [defaultValue]
 * 
 * @component RadioInput
 * @props {string} label
 * @props {string} value
 * @props {string} name

 *
 * @example:
  <RadioImageForm onStateChange={onChange}>
		{DATA.map(
			({ label, value, name }): React.ReactElement => (
				<RadioImageForm.RadioInput
					label={label}
					value={value}
					name={label}
			),
		)}
	</RadioImageForm>
 * */
export class RadioInputForm extends React.Component<Props, State> {
  static Consumer = RadioInputFormContext.Consumer;

  /**
   * The static keyword makes it a property of the class RadioInputForm, allowing
   * the end user to reference them from the class:
   * e.g. <RadioInputForm.RadioInput />
   * Since the RadioInput is a static property, it does not have access to the RadioInputForm instance.
   * Hence you can not reference state or methods in RadioInputForm class.
   * e.g. `this.onChange` will not work in the following example:
   * static RadioInput = ({ onChange, //... }) => //... <input onChange={this.onChange} //...
   */
  // Each of these compound components use the ToggleContext.Consumer
  // where it gets `currentValue` and `onChange` from the Consumer value.
  static RadioInput = ({ label, value, name }: RadioInputProps) => (
    <RadioInputForm.Consumer>
      {({ currentValue, onChange }) => (
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
      )}
    </RadioInputForm.Consumer>
  );

  static SubmitButton = ({ onSubmit }: SubmitButtonProps) => (
    <RadioInputForm.Consumer>
      {({ currentValue }) => (
        <button
          type='button'
          onClick={() => onSubmit?.(currentValue)}
          disabled={!currentValue}
          aria-disabled={!currentValue}
        >
          Submit
        </button>
      )}
    </RadioInputForm.Consumer>
  );

  static CurrentValue = () => (
    <RadioInputForm.Consumer>
      {({ currentValue }) => (
        <>
          <div>
            <h2>Current Value: {currentValue}</h2>
          </div>
        </>
      )}
    </RadioInputForm.Consumer>
  );

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setState(
      {
        currentValue: value,
      },
      () => {
        this.props.onStateChange && this.props.onStateChange(value);
      }
    );
  };

  // Because we'll be passing state into context value, we need to add the
  // onChange function to state.
  state = {
    currentValue: '',
    onChange: this.onChange,
    defaultValue: this.props.defaultValue || '',
  };

  render(): React.ReactElement {
    const { children } = this.props;
    // When ever the this value changes to something else it will re-render itself and all of its consumers.
    // React is constantly rendering so by passing an object to value prop it will re-render all of the consumers,
    // because the object is being reallocated on each render (creating a new object on each render).
    // This could be a performance problem.
    // e.g. <RadioInputFormContext.Provider value={{ currentValue: this.state.currentValue, onChange: this.onChange }}>
    // Instead pass this.state which will not re-render everytime as references the same object
    return (
      <RadioInputFormContext.Provider value={this.state}>
        {children}
      </RadioInputFormContext.Provider>
    );
  }
}

export default RadioInputForm;

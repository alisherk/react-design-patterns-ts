import * as React from 'react';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
}

interface State {
  currentValue: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface RadioInputProps {
  label: string;
  value: string;
  name: string;
  key: string | number;
  currentValue?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}


class RadioInputForm extends React.Component<Props, State> {

  static RadioInput = React.memo(
    ({
      currentValue,
      onChange,
      value,
      name,
      key,
    }: RadioInputProps): React.ReactElement => (
      <label key={key}>
        <input
          type='radio'
          name={name}
          value={value}
          onChange={onChange}
          checked={currentValue === value}
        />
      </label>
    )
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

  state = {
    currentValue: '',
    onChange: this.onChange,
    defaultValue: this.props.defaultValue || '',
  };

  render(): React.ReactElement {
    /**
     *
     * We're trying to let the consumer of our component to render the components they want within the
     * RadioImageForm component. But the RadioInput components will need access to the internal state,
     * the internal `onChange` function and as well the user's props for them to work properly. But how do
     * we pass this data to the subset component? This is where React.Children.map and React.cloneElement
     * comes into play.
     *
     * To do this, we can use:
     * 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
     * 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement
     */
    const { currentValue, onChange, defaultValue } = this.state;
    // If only one child exist then this.props.children will contain an element and not an array
    // so it is important to use React.Children.map() here.
    return (
      <form>
        {
          // So here we can take all this.props.children and make a copy of them that has those props.
          React.Children.map(
            this.props.children as React.ReactElement[],
            (child: React.ReactElement) =>
              // Clone and return a new React element using element as the starting point.
              // The resulting element will have the original element’s props with the
              // new props merged in shallowly. New children will replace existing children.
              React.cloneElement(child, {
                currentValue,
                onChange,
                defaultValue,
              })
          )
        }
      </form>
    );
  }
}

export default RadioInputForm;

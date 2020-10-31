import React from 'react';

interface Props {
   
}
  

interface State {
  amount: number;
}

export const withAmount = <P extends {}> ( currencyComponents: React.FC<P>[]) =>
  class Amount extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
 
      this.state = {
        amount: 0,
      };
    }
 
    onIncrement = () => {
      this.setState(state => ({ amount: state.amount + 1 }));
    };
 
    onDecrement = () => {
      this.setState(state => ({ amount: state.amount - 1 }));
    };
 
    render() {
      return (
        <div>
          <span>US Dollar: {this.state.amount} </span>
 
          <button type="button" onClick={this.onIncrement}>
            +
          </button>
          <button type="button" onClick={this.onDecrement}>
            -
          </button>
 
          {currencyComponents.map((CurrencyComponent: React.FC<any>) => (
            <CurrencyComponent amount={this.state.amount} />
          ))}
        </div>
      );
    }
  };


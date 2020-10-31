import React from 'react';

//this pattern perfoms some kind of state reduction on a component 
// this may be specific reactive state that one need to achieve 

interface State {
  on: boolean;
}

interface Props {
  initialOn: boolean;
  onToggle: (param: boolean) => void;
  stateReducer: (state: any, object: any) => {};
  onReset: (param: boolean) => void;
}

class Toggle extends React.Component<Props, State> {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state: any, changes: any) => changes,
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;

  internalSetState(changes: State | Function, callback: () => void) {
    this.setState((state) => {
      // handle function setState call
      //our changes param can either either be State or Function 
      //if it is a function we give it our state and let the client implement whatever state logic then assign it to changesObject
      //if it is not function, we simply assign changes to changesObject
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes;

      // apply state reducer
      // stateReducer is called from the parent. It takes on our state and changesObject 
      // it can implement specific state logic / action from the parent which is assigned to reducedChanges 
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};

      // return null if there are no changes to be made
      // (to avoid an unecessary rerender)
      // or return the reducedChanges which will contain reduced state logic
      return Object.keys(reducedChanges).length ? reducedChanges : null;
    }, callback);
  }

  toggle = () => {
    this.internalSetState(
      (state: State) => ({ on: !state.on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  reset = () =>
    this.internalSetState(this.initialState, () =>
      this.props.onReset(this.state.on)
    );

  render() {
    return (
      <div>
        {this.state.on ? 'It is on' : 'It is off'}
        <button onClick={this.toggle}> Toggle </button>
        <button onClick={this.reset}> Reset </button>
      </div>
    );
  }
}

interface ExampleProps {}

interface ExampleState {
  timesClicked: number;
}

export class StateReducerExample extends React.Component<
  ExampleProps,
  ExampleState
> {
  initialState = { timesClicked: 0 };
  state = this.initialState;

  handleToggle = () => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1,
    }));
  };
  handleReset = () => {
    this.setState(this.initialState);
  };

  toggleStateReducer = (state: any, changes: any) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };

  render() {
    const { timesClicked } = this.state;
    return (
      <div>
        <p>
          Click count: {' '}
          {timesClicked >= 4 ? 'Clicked more than 4 times' : timesClicked }
        </p>
        <Toggle
          stateReducer={this.toggleStateReducer}
          onToggle={this.handleToggle}
          onReset={this.handleReset }
        />
      </div>
    );
  }
}

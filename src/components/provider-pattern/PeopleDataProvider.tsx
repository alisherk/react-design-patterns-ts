import * as React from 'react';

export enum Status {
  loading = 'LOADING',
  loaded = 'LOADED',
  error = 'ERROR',
}

export interface IPerson {
    id: number;
    name: string;
    age: number;
    birthyear: number;
  }

interface State {
  data: IPerson[] | null;
  status: Status;
  error: Error | null;
}

const MOCK_DATA: IPerson[] = [
    { id: 1, name: 'Gary', age: 20, birthyear: 1990 },
    { id: 2, name: 'Mary', age: 21, birthyear: 1991 },
  ];
  

const initState: State = { status: Status.loading, data: null, error: null };

// Create a DogDataProviderContext with React.createContext
const PersonDataProviderContext = React.createContext<State | null>(null);

// The Custom Consumer Hook
// The custom hook uses React.useContext to get the provided context value, and
// it will return the context state when we call it.
// By exposing the custom hook, the consumer components can subscribe to the state
// managed in the provider data component. Also, we have added error handling if the
// hook is called in a component that is not a descendant of the data provider component.
// This will ensure if misused that it will fail fast and provide a valuable error message.
export function usePeopleProviderState() {
  const context = React.useContext(PersonDataProviderContext);

/*   pass null to React.createContext() and DO NOT pass
  default values. */
  if (!context) {
    throw new Error('component must be wrapped within PersonDataProvider.');
  }

  return context;
}

// Our data provider wrapper component
const PeopleDataProvider: React.FC = ({ children }): JSX.Element => {
  // Everything that we want to provide to our consumer components
  // should be put into `state`.
  // It will help us avoid unnecessary re-renders.
  const [state, setState] = React.useState<State>(initState);

  React.useEffect(() => {
    setState(initState);

    (async (): Promise<void> => {
      try {
        // MOCK API CALL
        const asyncMockApiFn = async (): Promise<IPerson[]> =>
          await new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 1000));
        // MOCK FAILED API CALL
        // const asyncFnReject = async (): Promise<void> => {
        // 	await new Promise((resolve, reject) =>
        // 		setTimeout(() => {
        // 			reject(new Error('Request failed with status code 404'));
        // 		}, 1000),
        // 	);
        // };
        const data = await asyncMockApiFn();
        setState({
          data,
          status: Status.loaded,
          error: null,
        });
      } catch (error) {
        setState({
          error,
          status: Status.error,
          data: null,
        });
      }
    })();
  }, []);

  return (
    <PersonDataProviderContext.Provider value={state}>
      {children}
    </PersonDataProviderContext.Provider>
  );
};

export default PeopleDataProvider;

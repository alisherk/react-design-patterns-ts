import React, { createContext, useContext, useReducer } from 'react';

interface IBook {
  id: number;
  title: string;
  description: string;
}

const data: IBook[] = [
  {
    id: 1,
    title: 'The wolf of Wall Street',
    description: 'Story about Wall Street maverick',
  },
  {
    id: 2,
    title: 'The Wicher',
    description: 'Story about a supernatural being',
  },
];

interface State {
  data: IBook[] | null;
  error: null | Error;
  loading: boolean;
}

const BookDataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
} | null>(null);

export function useBookDataContext() {
  const context = useContext(BookDataContext);
  if (!context) throw new Error('Component must be wrapped in BookDataProvide');
  return context;
}

enum ActionTypes {
  ADD = 'ADD',
}

type Action = { type: ActionTypes.ADD; book: IBook };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        data: data.concat(action.book),
      };

    default:
      return state;
  }
}

const initialState: State = { data: data, error: null, loading: true };

export const BookDataProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookDataContext.Provider value={{ state, dispatch }}>
      {children}
    </BookDataContext.Provider>
  );
};

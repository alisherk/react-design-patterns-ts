import React, { createContext, useContext, useReducer } from 'react';

interface IBook {
  id: number;
  title: string;
  description: string;
}

const books: IBook[] = [
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
  books: IBook[];
  error: null | Error;
  loading: boolean;
}; 

type Action = { type: ActionTypes.ADD; book: IBook };

const BookDataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function useBookDataContext() {
  const context = useContext(BookDataContext);
  if (!context) throw new Error('Component must be wrapped in BookDataProvide');
  return context;
}

export enum ActionTypes {
  ADD = 'ADD',
}


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        books: state.books.concat(action.book)
      };

    default:
      return state;
  }
}

const initialState: State = { books, error: null, loading: true };

export const BookDataProvider: React.FC = ({ children }): JSX.Element => {
  
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookDataContext.Provider value={{ state, dispatch }}>
      {children}
    </BookDataContext.Provider>
  );
};

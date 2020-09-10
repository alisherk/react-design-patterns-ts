import React, { createContext } from 'react';

type Callback = () => void;
type Dependencies<T> = T[];
type WithChildren = { children: React.ReactNode }
type ButtonProps = {[key: string]: any }

interface WithStaticFunctions {
    On: ({ children}: WithChildren) => any 
    Off: ({ children}: WithChildren) => any 
    Button:(props: ButtonProps) => JSX.Element;  
  }

interface Props {
  onToggle?: (on: boolean) => void;
}

interface ContextState {
  on: Boolean;
  toggle: () => void;
} 

const ToggleContext = createContext<ContextState>({
  on: false,
  toggle: () => {},
});

function useEffectAfterMount<T>(cb: Callback, deps: Dependencies<T>) {
  const justMounted = React.useRef<boolean>(true);
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb();
    }
    justMounted.current = false;
  }, [deps, cb]);
}

const Toggle: React.FC<Props> & WithStaticFunctions = (props): JSX.Element => {
  
  const [on, setOn] = React.useState<boolean>(false);
  const toggle = React.useCallback(() => setOn((oldOn) => !oldOn), []);

  useEffectAfterMount(() => props.onToggle?.(on), [on, props.onToggle]);

  const value = React.useMemo(() => ({ on, toggle }), [on, toggle]);
 
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  );
};
function useToggleContext() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }
  return context;
}
function On({ children }: WithChildren) {
  const { on } = useToggleContext();
  return on ? children : null;
}
function Off({ children }: WithChildren ) {
  const { on } = useToggleContext();
  return on ? null : children;
}
function Button(props: ButtonProps) {
  const { toggle } = useToggleContext();
  return <input type='checkbox' onClick={toggle} {...props} />;
}

Toggle.On = On;
Toggle.Off = Off;
Toggle.Button = Button;


export default Toggle;
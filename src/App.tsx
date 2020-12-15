import React from 'react';
import { PeopleDataProviderUsage, BookDataProviderUsage } from './patterns/provider-pattern';
import { ToggleCompoundCompUsage } from './patterns/flexible-compound-pattern';
import { UsageOfAltHocPattern } from './patterns/render-props-pattern'
//import { Usage } from './patterns/optimized-context/Usage';
import { HydraUsage } from './patterns/hydra-pattern/HydraUsage';
import { StateReducerExample  } from './patterns/state-reducer-pattern/state-reducer';
import { Usage } from './custom-hooks/pagination/Usage'; 
import {
    InjectedPropsUsage,
    InjectedAndPassedPropsUsage,
    InjectedAndPassedPropsUsageFC
  } from './patterns/hoc-pattern';

function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: '50%',
        marginTop: '10%',
        border: 'solid 1px',
        padding: '10px',
      }}
    >
      <h3> StateReducer Pattern</h3>
      <StateReducerExample />
      <h3> Flexible compound pattern implementation</h3>
      <ToggleCompoundCompUsage />
      <h3> Provider pattern implementation</h3>
      <PeopleDataProviderUsage />
      <h3> HOC example with injected props </h3>
      <InjectedPropsUsage />
      <h3> HOC example with injected props and passed in props </h3>
      <InjectedAndPassedPropsUsage />
      <h3> FC HOC example with injected props and passed in props </h3>
      <InjectedAndPassedPropsUsageFC />
      <h3> Children as function example </h3>
      <UsageOfAltHocPattern />
      <h3> Provider pattern with reducer </h3>
      <BookDataProviderUsage />
      <h3> Hydra Pattern</h3>
      <HydraUsage />
      <h3> Pagination hook</h3>
      <Usage />
    </div>
  );
}

export default App;

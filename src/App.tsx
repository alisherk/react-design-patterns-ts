import React from 'react';
import { PeopleDataProviderUsage } from './components/provider-pattern';
import { ToggleCompoundCompUsage } from './components/flexible-compound-pattern';
import {
  InjectedPropsUsage,
  InjectedAndPassedPropsUsage,
  InjectedAndPassedPropsUsageFC
} from './components/hoc-pattern';

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
      {' '}
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
    </div>
  );
}

export default App;

import React from 'react';
import { PeopleDataProviderUsage, BookDataProviderUsage } from './components/provider-pattern';
import { ToggleCompoundCompUsage } from './components/flexible-compound-pattern';
import { UsageOfAltHocPattern } from './components/render-props-pattern'
import {
  InjectedPropsUsage,
  InjectedAndPassedPropsUsage,
  InjectedAndPassedPropsUsageFC
} from './components/hoc-pattern';
import { Usage } from './components/optimized-context/Usage';

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
      <h3> Optimized context state</h3>
      <Usage/>
    </div>
  );
}

export default App;

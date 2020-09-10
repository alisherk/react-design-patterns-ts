import React from 'react';
import { PeopleDataProviderUsage } from './components/provider-component';
import { ToggleCompoundCompUsage } from './components/flexible-compound-component/';

function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: '50%',
        marginTop: '10%',
        border: 'solid 1px',
        padding: '10px'
      }}
    >  <h3> Flexible compound pattern implementation</h3>
      <ToggleCompoundCompUsage />
      
      <h3> Provider pattern implementation</h3>
      <PeopleDataProviderUsage />
    </div>
  );
}

export default App;

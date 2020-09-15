import React from 'react';

interface WithLoadingProps {
  loading: boolean;
}

export const withLoader = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <p> ...Loading </p> : <Component {...(props as P)} />;
    }
  };



import * as React from 'react';

type Props = {
  id?: string[] | string;
};
type State = {
  error: any;
  info: any;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  state = {
    error: undefined,
    info: undefined,
  };

  componentDidCatch(error, info: { componentStack: string }) {
    // Display fallback UI
    this.setState({
      error,
      info,
    });
    console.warn(error);
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}


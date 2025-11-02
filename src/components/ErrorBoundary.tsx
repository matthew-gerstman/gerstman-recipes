import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 card m-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Something went wrong
          </h2>
          <p className="text-text-secondary mb-4">
            {this.state.error?.message || 'Unknown error'}
          </p>
          <pre className="text-sm text-text-tertiary bg-background-tertiary p-4 rounded overflow-auto">
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

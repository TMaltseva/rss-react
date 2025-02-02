import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем стейт, чтобы следующий рендер показал fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Логируем ошибку в консоль согласно требованиям
    console.error('Error caught by boundary:', {
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Показываем fallback UI согласно требованиям
      return (
        <div className="error-boundary-fallback">
          <h2 className="error-message">Something went wrong</h2>
          {this.state.error && <p className="error-details">{this.state.error.message}</p>}
          <button onClick={this.handleReset} className="error-reset-button">
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

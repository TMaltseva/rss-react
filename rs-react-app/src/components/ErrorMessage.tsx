import { Component } from 'react';

import '../styles/components/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export default class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className="error-container">
        <p>{this.props.message}</p>
      </div>
    );
  }
}

import { Component } from 'react';

interface ThrowErrorButtonProps {
  onError: () => void;
}

interface ThrowErrorButtonState {
  throwError: boolean;
}

export default class ThrowErrorButton extends Component<ThrowErrorButtonProps, ThrowErrorButtonState> {
  constructor(props: ThrowErrorButtonProps) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error from ThrowErrorButton');
    }

    return (
      <button className="throw-error-btn" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

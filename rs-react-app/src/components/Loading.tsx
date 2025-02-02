import { Component } from 'react';
import '../styles/components/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }
}

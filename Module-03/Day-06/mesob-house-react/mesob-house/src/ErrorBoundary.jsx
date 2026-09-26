import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In a real app this would report to a logging service.
    console.error("Mesob House caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="screen error-boundary">
          <h3 style={{ marginBottom: 8 }}>Something went wrong</h3>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
            {this.props.fallbackMessage ||
              "This part of Mesob House hit a snag. You can try again."}
          </p>
          <button className="primary-btn" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

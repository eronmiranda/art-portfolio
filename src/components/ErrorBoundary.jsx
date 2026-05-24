import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      const fallback = this.props.fallback;
      if (fallback) return fallback;

      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Something went wrong
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {this.state.error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-6 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

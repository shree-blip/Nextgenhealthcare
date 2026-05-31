import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isDark?: boolean;
}

interface ClientErrorBoundaryState {
  hasError: boolean;
}

export default class ClientErrorBoundary extends React.Component<ClientErrorBoundaryProps, ClientErrorBoundaryState> {
  constructor(props: ClientErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ClientErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ClientErrorBoundary] Caught render error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isDark = !!this.props.isDark;
    return (
      <div className={`rounded-2xl border p-8 text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="h-14 w-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {this.props.title || 'Something went wrong'}
        </h3>
        <p className={`text-sm max-w-md mx-auto mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {this.props.description || 'A client-side error occurred while rendering this section. You can retry without leaving the page.'}
        </p>
        <button
          onClick={this.handleRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }
}

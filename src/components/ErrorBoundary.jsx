import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lumora Storefront ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1F2022] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <AlertCircle className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8843E] font-semibold">
            Lumora Fine Jewelry
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2022]">
            Unable to Display Atelier Showcase
          </h2>

          <p className="text-xs text-[#575A61] max-w-md leading-relaxed">
            A temporary display error occurred while loading this view. Click below to refresh the atelier storefront.
          </p>

          {this.state.error && (
            <div className="p-3 rounded-lg bg-white border border-[#EAE3D5] text-[11px] text-rose-700 font-mono max-w-lg text-left overflow-x-auto shadow-xs">
              {this.state.error.toString()}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Store</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('lumora_cart');
                window.location.href = '/';
              }}
              className="px-4 py-2.5 bg-white border border-[#EAE3D5] hover:border-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded"
            >
              Reset Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background-secondary">
      <nav className="bg-background-primary border-b border-border-primary sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <h1 className="text-xl font-bold text-text-primary">
                Gerstman Family Recipes
              </h1>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/whats-for-dinner"
                className="text-text-secondary hover:text-accent-primary transition-colors font-medium"
              >
                What's for Dinner?
              </Link>
              <button
                onClick={toggleTheme}
                className="btn-secondary"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-background-primary border-t border-border-primary mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-text-secondary text-sm">
          <p>Made with ❤️ by the Gerstman Family</p>
        </div>
      </footer>
    </div>
  );
}

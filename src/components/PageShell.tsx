import type { ReactNode } from 'react';
import Brand from './Brand';

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <main className={`page-shell ${className}`.trim()}>
      <div className="page-container">
        <header className="site-header">
          <Brand />
        </header>
        {children}
      </div>
    </main>
  );
}

export default PageShell;

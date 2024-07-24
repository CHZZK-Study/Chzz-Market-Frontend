import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  header: string;
  children: ReactNode;
  footer: ReactNode;
}

const Layout = ({ header, children, footer }: LayoutProps) => {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-[46rem] min-w-[23rem] flex flex-col justify-between h-full">
        <Header name={header} />
        <main className="flex flex-col w-full gap-4 px-8 py-4 overflow-y-scroll">
          {children}
        </main>
        {footer && footer}
      </div>
    </div>
  );
};

export default Layout;

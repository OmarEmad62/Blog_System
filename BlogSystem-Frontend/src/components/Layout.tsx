
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="py-6 border-t border-border mt-auto">
        <div className="container text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} BLOGIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
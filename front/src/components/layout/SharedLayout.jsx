import { Outlet, NavLink } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div>
      <header className={css.header}>
        <nav>
          <NavLink className={css.navLink} to="/" end>
            Home
          </NavLink>
          <NavLink className={css.navLink} to="/register">
            Register
          </NavLink>
          <NavLink className={css.navLink} to="/login">
            Login
          </NavLink>
          <NavLink className={css.navLink} to="/game">
            Game
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading....</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

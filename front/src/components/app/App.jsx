import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from 'components/layout/SharedLayout';
// import { Home } from '../../pages/Home';
// import { Game } from '../../pages/Game';
// import { Login } from '../../pages/Login';
// import { Register } from '../../pages/Register';

const Home = lazy(() => import('../../pages/Home'));
const Register = lazy(() => import('../../pages/Register'));
const Login = lazy(() => import('../../pages/Login'));
const Game = lazy(() => import('../../pages/Game'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
};

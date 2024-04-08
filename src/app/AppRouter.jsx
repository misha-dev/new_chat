import { Navigate, Route, Routes } from 'react-router-dom';

import { Chat } from '../Components/Chat/Chat';
import { Layout } from '../Components/Layout/Layout';
import { Loader } from '../Components/Loaders/LoaderMain/Loader';
import { Login } from '../pages/Login/Login';
import { useAuth } from '../hooks/useAuth';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import './App.css';

export const AppRouter = () => {
  const { logged } = useFirebaseContext();
  const user = useAuth();

  return (
    <main>
      {logged ? (
        <Routes>
          <Route path="/chatonline" element={<Layout />}>
            {user ? <Route index element={<Chat />} /> : <Route index element={<Login />} />}
          </Route>
          <Route path="*" element={<Navigate to="/chatonline" replace />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </main>
  );
};

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../entities/user/model/useAuth';
import { useFirebaseContext } from '../shared/firebase/useFirebaseContext';
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

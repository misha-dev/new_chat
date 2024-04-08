import { Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from '@/pages/Auth/Auth';
import { Chat } from '@/pages/Chat/Chat';
import { Loader } from '@/shared/components/Loaders/LoaderMain/Loader';
import { useFirebaseContext } from '@/shared/firebase/useFirebaseContext';

import { useAuth } from '@/entities/user/model/useAuth';
import { Layout } from '@/widgets/Layout/Layout';
import './App.css';

export const AppRouter = () => {
  const { logged } = useFirebaseContext();
  const user = useAuth();

  return (
    <main>
      {logged ? (
        <Routes>
          <Route path="/chatonline" element={<Layout />}>
            {user ? <Route index element={<Chat />} /> : <Route index element={<Auth />} />}
          </Route>
          <Route path="*" element={<Navigate to="/chatonline" replace />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </main>
  );
};

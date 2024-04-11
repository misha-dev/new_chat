import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppNotificationsProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} position="bottom-right" />
    </>
  );
};

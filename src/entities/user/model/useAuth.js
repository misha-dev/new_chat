import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/config";

export const useAuth = () => {
  const [user] = useAuthState(auth);
  return user;
};

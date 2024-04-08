import { useContext } from "react";

import { FirebaseContext } from "../context/FirebaseContext";
export const useFirebaseContext = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    throw new Error("useFirebaseContext should be within FirebaseContextProvider!");
  }

  return firebaseContext;
};

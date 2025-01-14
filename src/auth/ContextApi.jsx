
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const AssetContext = createContext(null);

const ContextApi = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registration = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setLoading(false)
    });
    return () => {
        unsubscribe()
    }
  },[])
  const value = {
    registration
  };
  console.log(user)
  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};

export default ContextApi;

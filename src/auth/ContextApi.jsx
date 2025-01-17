
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useToast } from "@/hooks/use-toast";
export const AssetContext = createContext(null);

const ContextApi = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic()
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [demoLoad, setDemoLoad] = useState(0)
  const [editorContent, setEditorContent] = useState('');
  useEffect(() => {
    if (!user) {
        return
    }

    const {email, displayName, photoURL} = user;
    const newUser = {email, name: displayName, image: photoURL, role: 'user'}
    axiosPublic.post('/users', newUser)


  },[user])

  const registration = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleProvider = new GoogleAuthProvider()
  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const facebookProvider = new FacebookAuthProvider()
  const facebookLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, facebookProvider)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        if (currentUser?.email) {
          const user = {email: currentUser.email}
          axiosPublic.post('/jwt', user, {withCredentials: true})
          .then(() => {
            setLoading(false)

          })
        }
        else{
          axiosPublic.post('/logout',{}, {withCredentials: true})
          .then(() => {
            setLoading(false)
          })
        }
    });
    return () => {
        unsubscribe()
    }
  },[])
  const value = {
    registration,
    login,
    user,
    loading,
    googleLogin,
    facebookLogin,
    logOut,
    editorContent,
    setEditorContent,
    isOpenPayment,
    setIsOpenPayment,
    demoLoad,
    setDemoLoad
  };
  console.log(user)
  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};

export default ContextApi;

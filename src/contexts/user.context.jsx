// import {createContext, useState, useEffect} from 'react'
// import { onAuthStateChangedListener,createUserDocumentFromAuth} from '../Utils/firebase/firebase-utils';
// //as the actual value you want to access

// export const userContext = createContext({
//  setCurrentUser: () => null,
//   currentUser:null,
// });

// export const UserProvider = ({children}) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const value = {currentUser, setCurrentUser};
    

//     useEffect(() => {
//         const unsubscribe = onAuthStateChangedListener((user) => {
//            if(user) {
//               createUserDocumentFromAuth(user)
//            } 
//            setCurrentUser(user);
//         });
//         return unsubscribe;
//     },[])

//     return <userContext.Provider value={value}>{children}</userContext.Provider>
// }

import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../Utils/firebase/firebase-utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA2BzJJfhe4wrCMtiZWFYzVVGe6PJbQN2w",
  authDomain: "crown-clothing-fb292.firebaseapp.com",
  projectId: "crown-clothing-fb292",
  storageBucket: "crown-clothing-fb292.appspot.com",
  messagingSenderId: "161258280118",
  appId: "1:161258280118:web:ff196ce08c3b671b1a4217"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) =>{
    const userDocRef = doc(db,'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exist()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      
      }catch (error) {
     console.log('error createing the user', error.message)
      }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
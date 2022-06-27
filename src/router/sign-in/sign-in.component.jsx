
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    } from '../../Utils/firebase/firebase-utils'
import SignInFrom from '../../components/sign-up-form/sign-up-form.component'


const SignIn = () => {
  
  const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    }
    

    return (
        <div>
            <div>Sign in Page</div>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignInFrom />
        </div>   
    )
}

export default SignIn;
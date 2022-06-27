import { useState } from "react";
import {signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword} from '../../Utils/firebase/firebase-utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import Button from '../button/button.component'
const defaultFormFields = {
    email: "",
    password: ""
    
}



const SignInForm = () => {
 const [formFields , setFormFields] = useState(defaultFormFields);
const {email, password} = formFields;

const resetForm = () => {
  setFormFields(defaultFormFields)
}

const signInWithGoogle = async () => {
  const {user} = await signInWithGooglePopup();
  await createUserDocumentFromAuth(user);
}
const handleSubmit = async (event) => {
    event.preventDefault();

    

    try{
      const response = await signInAuthUserWithEmailAndPassword(email,password)
       resetForm()
    }catch(error){
      switch(error.code){
        case 'auth/wrong-password':
        alert('incorrect password for email');
        break;
        case 'auth/user-not-found':
        alert('no user associated with this email');
        break;
        default:
          console.log(error)
      }
    }
}

const handleChange = (event) => {
 const {name,value} = event.target;

 setFormFields({...formFields, [name]:value});
}

  return(
      <div className="sign-in-container">
       <h2>Already you have account</h2>
        <span>Sign In with Email and Password</span>
      <form onSubmit={handleSubmit}>
          <FormInput
           label="Email" 
           type="email"
           name="email"
            value={email}
            required
            onChange={handleChange} 
          />
          <FormInput
           label="Password" 
           type="password"
           name="password"
            value={password}
            required
            onChange={handleChange} 
          />

          <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
          </div>
          
      </form>
      </div>
    
  )  

}

export default SignInForm;
import { useState} from "react";

import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import Button from '../button/button.component'
import {signInWithGooglePopup,signInAuthUserWithEmailAndPassword} from '../../Utils/firebase/firebase-utils'
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
  await signInWithGooglePopup();

}
const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email,password) 
      resetForm();
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
import { useState} from "react";
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from '../../Utils/firebase/firebase-utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss';
import Button from '../button/button.component'
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}



const SignUpForm = () => {
 const [formFields , setFormFields] = useState(defaultFormFields);
 const {displayName, email, password, confirmPassword} = formFields;

const resetForm = () => {
  setFormFields(defaultFormFields)
}
const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try{
     const {user} = await createAuthUserWithEmailAndPassword(
       email, 
       password
       );

       await createUserDocumentFromAuth(user, {displayName})
       resetForm()
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      }
    }
}

const handleChange = (event) => {
 const {name,value} = event.target;

 setFormFields({...formFields, [name]:value});
}

  return(
      <div className="sign-up-container">
       <h2>Don't you have account</h2>
        <span>Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        
         <FormInput
           label="Display Name" 
           type="text"
           name="displayName"
            value={displayName}
            required
            onChange={handleChange} 
          />
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
          <FormInput
           label="Confirm Password" 
           type="password"
           name="confirmPassword"
            value={confirmPassword}
            required
            onChange={handleChange} 
          />
          <Button type="submit">Sign Up</Button>
      </form>
      </div>
    
  )  

}

export default SignUpForm;
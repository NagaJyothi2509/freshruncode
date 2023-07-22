import {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
//import { ToastClassName } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
//import { ToastContextProvider } from '../context/ToastContext';
const Register=()=>{
  const {toast}=useContext(ToastContext);
  const {registerUser}=useContext(AuthContext);
    const [credentials,setCredentials]=useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    })

  const handleInputChange=(event)=>{
    const{name,value}=event.target;
    setCredentials({...credentials,[name]:value});

  };

const handleSubmit=(event)=>{
  event.preventDefault();

if(!credentials.email || !credentials.password || !credentials.confirmPassword){
   toast.error("Please enter all the required fileds");
   return;
}
if(credentials.password!==credentials.confirmPassword){
  toast.error("password do not match");
  return;
}

const userData={...credentials,confirmPassword:undefined};
registerUser(userData);

}

    return(<>
    
    
    <h3>CREATE YOUR ACCOUNT</h3>

<form onSubmit={handleSubmit}>
<div class="form-group">
    <label for="nameInput" class="form-label mt-4">
      Your Name</label>
    <input 
    type="text" 
    class="form-control" 
    id="nameInput" 
    
    name="name"
    value={credentials.name}
    onChange={handleInputChange}
     placeholder="johndoe"
     required/>
  </div>




<div class="form-group">
    <label for="emailInput" class="form-label mt-4">
      Email address</label>
    <input 
    type="email" 
    class="form-control" 
    id="emailInput" 
    aria-describedby="emailHelp"
    name="email"
    value={credentials.email}
    onChange={handleInputChange}
     placeholder="john@example.com"
     required/>
  </div>

  <div class="form-group">
    <label for="passwordInput" class="form-label mt-4">
      Password</label>
    <input 
    type="password" 
    class="form-control" 
    id="passwordInput"  
    name="password"
    value={credentials.password}
    onChange={handleInputChange}
    placeholder="Enter password"
    required/>
  </div>

  <div class="form-group">
    <label for="confirmPassword" class="form-label mt-4">
      Confirm Password
      </label>
    <input type="password" 
    class="form-control" 
    id="confirmPassword"  
    name="confirmPassword"
    value={credentials.confirmpassword}
    onChange={handleInputChange}
    placeholder="Enter password"
    required/>
  </div>




<input type="submit" value="Register" className="btn btn-primary my-3" />
<p>Already have an account?<Link to="/login">Login</Link></p>



</form>    
    
    
    
    </>
  )
};
export default Register;
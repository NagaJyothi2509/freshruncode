import React, { createContext, useContext, useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
//import { createContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AuthContext = createContext();

/*export const AuthContextProvider = ({ children }) => {
  const navigate=useNavigate();
  const location=useLocation();
  const {toast}=useContext(ToastContext);
  const [user, setUser] = useState(null); 
  // Initialize the user state
  const [error,setError]=useState(null);
  useEffect(()=>{
    checkUserLoggedIn();
  },[]);

  const checkUserLoggedIn=async ()=>{
   
    try{
        const res=await fetch(`http://localhost:8000/api/me`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
          }
    
        })
        const result=await res.json();
        if(!result.error){
          setUser(result);
          navigate("/",{repalce:true});
          
        }
        else{
          navigate("/login",{replace:true});
        }
    }catch(err){
      console.log(err)
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }) // Use the user state instead of userData
      });

      const result = await res.json();
      

      if(!result.error){
       // console.log(result);
        localStorage.setItem("token",result.token)
        setUser(result.user);
        toast.success(`Logged in ${result.user.name} `)
        navigate("/",{replace:true});

      }else{
        toast.error(result.error);
        
      }
      
    } catch (err) {
      console.log(err);
    }
  };

const registerUser=async(userData)=>{
    try{
        const res=await fetch(`http://localhost:8000/api/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({...userData}),
        })

      const result=await res.json();
      if(!result.error){
        toast.success("User registered succesfully! Login into your account")
        navigate("/login",{repalce:true})
      }
      else{
        toast.error(result.error)
      }
    }catch(err){
        console.log(err);
    }

}



  return (
    <AuthContext.Provider value={{loginUser,registerUser,user ,setUser}}>
      <ToastContainer autoClose={2000}/> 
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;*/
export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // check if the user is logged in.
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`https://cms-backend-tq04.onrender.com/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // login request.
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`https://cms-backend-tq04.onrender.com/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`Logged in ${result.user.name}`);

        navigate("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // register request.
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`https://cms-backend-tq04.onrender.com/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
        toast.success("user registered successfully! login into your account!");
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

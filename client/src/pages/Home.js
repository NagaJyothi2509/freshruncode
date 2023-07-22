/*import { useContext, useEffect } from "react";
import Login from "./Login";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = () => {

  
  const navigate=useNavigate();
  const {user} =useContext(AuthContext);
  useEffect(()=>{
       !user && navigate("/login",{replace:true});

  })
  return <>
  <div className="jumbotron">
  <h1>Welcome {user ?user.name:null}</h1>
  <hr className="my-4"/>
  
  <a className="btn btn-info" href="/create" role="button">Add Contact</a>
</div></>;
};

export default Home;*/
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Redirect to login page if user is not logged in
    !user && navigate("/login", { replace: true });
  }, [user, navigate]);

  return (
    <>
      <div className="jumbotron">
        <h1>Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />

        {/* Use Link component instead of anchor tag */}
        <Link className="btn btn-info" to="/create" role="button">
          Add Contact
        </Link>
      </div>
    </>
  );
};

export default Home;


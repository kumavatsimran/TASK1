import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';


const LoginPage = ({ onLogin }) => {
    const [user,setUser]=useState({})
    const [error,setError]=useState({})
    const [signIn,setSignIn]=useState(true)
    let navigate = useNavigate();    

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUser({...user,[name]:value});
        console.log(user);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      
      try {
        if (signIn) {
          signInWithEmailAndPassword(auth,user.email,user.password)
          .then(()=>{
            navigate('/Home')
            alert("signup succcefully")

          }).catch((err)=>{
            console.log(err);
            alert(err)
          })
        } else {
          createUserWithEmailAndPassword(auth,user.email,user.password)
          .then(()=>{
            navigate('/Home')
            alert("signup succcefully")
          }).catch((err)=>{
            console.log(err);
            alert(err)
          })
        }
        onLogin(); 
      } catch (error) {
        console.log(error);
      }
    };
    
  return (
    <>
       <div
      className="container-fluid d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "black",
      }}
    >
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-dark text-center text-white rounded-top-4">
            <h3 className="mb-1 ">
              {signIn ? "Welcome Back!" : "Join Us Today!"}
            </h3>
            <p className="mb-0">
               {signIn
                ? "Sign in to continue"
                : "Create an account to get started"} 
            </p>
          </div>

          <div className="card-body p-4">
            <div className="d-flex justify-content-center mb-4">
              <button
                onClick={() => setSignIn(false)}
                className={`btn ${
                  !signIn ? "btn-primary" : "btn-outline-primary"
                } me-2`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setSignIn(true)}
                className={`btn ${
                  signIn ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary mb-3">
                  {signIn ? "Sign In" : "Sign Up"}
                </button>
               
              </div>
            </form>
          </div>

          <div className="card-footer text-center text-muted small">
            <p>
             
              <span
                className="text-primary"
               
              >
              
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;

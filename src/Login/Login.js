import React, { useState } from 'react';
import './Login.css'

function Login(props) {

    const {
    email ,
    setEmail ,
    password ,
    setPassword ,
    emailError ,
    passwordError ,
    handleLogin ,
    handleSignUp ,
    hasAccount ,
    setHasAccount ,
    clearInputs,
    clearErrors,
    setYourName,
    yourName,
    nameError,
  } = props;
  
  function toggleHasAccount(){
    setHasAccount(!hasAccount);
  }
  
      return (
            <div className="login-page">
              <div className="form">
                <div className="login-form">
                <h2 className="head">Welcome to ForeverNote!</h2>
                <h3 className="head">Authentication</h3>
                <div className="login-form">
                {hasAccount && <input
                  type="text"
                  autoFocus
                  required
                  value = {yourName}
                  onChange = {(e)=>{setYourName(e.target.value);clearErrors();}}
                  id="inputUserName" className="form-control" placeholder="Your Name"/>
                }
                {hasAccount && nameError && <p className="info">Your Name should not be empty</p> }
                
                  <input
                  type="text"
                  autoFocus
                  required
                  value = {email}
                  onChange = {(e)=>{setEmail(e.target.value);clearErrors();}}
                  id="inputEmail" className="form-control" placeholder="Email address"/>
                  {emailError!==''? <p className="info">{emailError}</p>: null}
                </div>
  
                
                  <input
                  required
                  value={password}
                  onChange = {(e)=> {setPassword(e.target.value);clearErrors();}}
                  type="password" id="inputPassword" className="form-control" placeholder="Password"/>
                  {passwordError!==''? <p className="info">{passwordError}</p>:null}
                </div>
                <div className="login-form">
                {hasAccount? (
                          <>
                          <button className="button" onClick={handleSignUp}>Sign Up</button> <button className="button" onClick={clearInputs}>Clear</button>
                          <p className="message">Already Registered? <span className="underlineHover" style={{cursor:'pointer'}} onClick={toggleHasAccount}>Sign In</span></p>
                          </>
                      ):(
                          <>
                          <button className="button" onClick={handleLogin}>Sign In</button> <button className="button" onClick={clearInputs}>Clear</button>
                          <p className="message">Not registered? <span className="underlineHover" style={{cursor:'pointer'}} onClick={toggleHasAccount}>Sign Up</span></p>
                          </>
                      )}
                </div>
                </div>
            </div>
  
      )
  }
  
  export default Login;
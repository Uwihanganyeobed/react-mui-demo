import React, { useState } from 'react'
import'./css/LoginSignup.css'
const LoginSignup = () => {

  const [state, setState]=useState("Login");
  const [fomData, setFormData]=useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler=(e)=>{
    setFormData({...fomData, [e.target.name]: e.target.value})
  }

  const login = async()=>{
    console.log("Login fn executed",fomData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fomData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }
    
  const signup= async()=>{
    console.log("Signup fn executed",fomData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fomData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }

  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state=== "Sign Up"?<input name='username'value={fomData.username} onChange={changeHandler} type="text"placeholder='Your name' />: <></>}
          <input name='email'value={fomData.email} onChange={changeHandler} type="email"placeholder='Email address' />
          <input name='password'value={fomData.password} onChange={changeHandler} type="password"placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=> {setState("Login")}}>Login here</span></p>
        : <p className="loginsignup-login">Create an account? <span onClick={()=> {setState("Sign Up")}}>Click here</span></p>}
        
        <div className="loginsignup-agree">
          <input type="checkbox"name=''id='' />
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        </div>      
    </div>
  )
}

export default LoginSignup
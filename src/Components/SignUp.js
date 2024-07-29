import React, { useState,useContext } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/AlertContext';

export default function SignUp() {
    const ContextAlert = useContext(AlertContext);
    const {showAlert}=ContextAlert;
    const navigate = useNavigate();
    let [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    const {name,email,password,cpassword}=credentials;
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNGVjNWM1YTVhMGU4YzdlNDQ5NzJjIn0sImlhdCI6MTcyMjA4NDQ3MX0.jWoXkuNgimjhPJQSQsvRe3Fq4Gnem9ZISnlrEiatTsk");
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
        localStorage.setItem("token",json.authtoken);
        navigate('/home');
        showAlert("Account Created Successfully","success");
        }else{
          showAlert("Invalid details","danger");
        }
    };
    const onChange=(evt)=>{
        setCredentials({...credentials,[evt.target.name]:evt.target.value});
    };
  return (
    <div>
        <section className=" bg-image"
          style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                      <form onSubmit={handleSubmit}>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="name">Name</label>
                          <input type="text" id="name" name="name" value={name} onChange={onChange} className="form-control form-control-lg" minLength={3} />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input type="email" id="email" name="email" value={email} onChange={onChange} className="form-control form-control-lg" />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input type="password" id="password" name="password" value={password} onChange={onChange} className="form-control form-control-lg" minLength={8} required/>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="cpassword">Confirm password</label>
                          <input type="password" id="cpassword" name="cpassword" value={cpassword} onChange={onChange} className="form-control form-control-lg" minLength={8} required/>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button  type="submit" data-mdb-button-init
                            data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                        </div>
                        <p class="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/"
                        class="fw-bold text-body"><u>Login here</u></Link></p>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
    </div>
  )
}

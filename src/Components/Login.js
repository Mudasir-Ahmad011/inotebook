import React, { useContext, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/AlertContext';


export default function Login() {
    const ContextAlert = useContext(AlertContext);
    const {showAlert}=ContextAlert;
    const navigate = useNavigate();
    let [credentials,setCredentials]=useState({email:"",password:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNGVjNWM1YTVhMGU4YzdlNDQ5NzJjIn0sImlhdCI6MTcyMjA4NDQ3MX0.jWoXkuNgimjhPJQSQsvRe3Fq4Gnem9ZISnlrEiatTsk");
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
        localStorage.setItem("token",json.authtoken);
        navigate('/home');
        showAlert("Login Successfully","success");
        }else{
          showAlert("Invalid credentials","danger");
        }
    };
    const onChange=(evt)=>{
        setCredentials({...credentials,[evt.target.name]:evt.target.value});
    };
  return (
    <div>
        <section className="bg-image"
          style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-4">Access Portal</h2>

                      <form onSubmit={handleSubmit}>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg" />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg"/>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button  type="submit" data-mdb-button-init
                            data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                        </div>
                        <p class="text-center text-muted mt-5 mb-0">Create account on iNotebook <Link to="/signup"
                        class="fw-bold text-body"><u>SignUp</u></Link></p>
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

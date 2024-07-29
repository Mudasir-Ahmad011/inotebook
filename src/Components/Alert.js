import React,{ useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";

export default function Alert() {
  const ContextAlert = useContext(AlertContext);
  const {alert}=ContextAlert;

  const Capitalize = (type)=>{
    if(type==="danger"){
      type="error";
    }
    let lower = type.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{height:"40px"}}>
    {alert &&
    <div>
        <div class={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" style={{padding:"5px",marginBottom:"10px"}}>
            <strong>{Capitalize(alert.type)}</strong> : {alert.message}
        </div>
    </div>}
    </div>
  )
}
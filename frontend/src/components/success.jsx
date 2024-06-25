import React from "react";
import { useLocation, useParams } from "react-router-dom";


const Success = () => {
    const location = useLocation()
    const {message} = location.state || {}
  return (
    <div><h1>{message || "hello"}</h1></div>
  )
}

const Failed = () =>{
  return (
    <div><h1>Error occured while logging in check your credientials</h1></div>
  )
}

export {Success, Failed}


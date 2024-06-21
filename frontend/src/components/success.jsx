import React from "react";
import { useLocation, useParams } from "react-router-dom";


const Success = () => {
    const location = useLocation()
    const {message} = location.state || {}
  return (
    <div><h1>{message}</h1></div>
  )
}

export {Success}

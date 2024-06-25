import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const VerifyEmail = () => {
  const { token } = useParams()
  const [message, setMessage] = useState("verifying...")
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/users/verify/${token}`, {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(response.message)
        }

        const data = await response.json()
        console.log(data.message)
        setMessage(data.message)

      } catch (error) {
        setMessage(error.message)
        throw new Error(error.message)
      }

    }

    verifyToken()
  }, [token])


  return (
    <div><h1>{message}</h1></div>
  )
}

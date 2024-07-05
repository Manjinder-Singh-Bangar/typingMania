import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const RegisterForm = () => {
    const [user, setUser] = useState({
        username: "",
        password:"",
        email:"",
        fullName: ""
    })
    const navigate = useNavigate()

    const handleInput = (e) =>{
        const name = e.target.name
        const value = e.target.value 

        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          };

        await fetch("http://localhost:4000/api/v1/users/register", options)
        .then( async response =>{

            if(!response.ok){
                throw new Error("This account is already registered")
            }
            
            const data = await response.json()
            navigate(`/success`, {state:{message: data.message}})
            return data
        })
        
        .catch(error => {
            navigate(`/failed`, {state:{message: error.message}})
            console.error('Error:', error); // Handle the error
        });
    }

  return (
    <>
    <form action="">
        <label htmlFor="">FullName</label>
        <input onChange={handleInput} name='fullName' value={user.fullName} type="text" />

        <label htmlFor="">UserName</label>
        <input onChange={handleInput} name='username' value={user.username} type="text" />

        <label htmlFor="">Email</label>
        <input onChange={handleInput} name='email' value={user.email} type="email" />

        <label htmlFor="">Password</label>
        <input onChange={handleInput} name='password' value={user.password} type="password"/>

        <button onClick={handleSubmit} type='submit'>Submit</button>
    </form>
    </>
  )
}

const LoginForm = () =>{
  const [user , setUser] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate();



  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(user)


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", options)
      if(!response.ok){
        // navigate(`/failed`, {state:{message: response.message}})
        navigate(`/failed`)
        throw new Error(response.message)
      }

      navigate(`/home/${user.username}`)

      return response.json
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <form action="">
      <label htmlFor="">Username</label>
      <input onChange={handleInput} name='username' type="text" value={user.username} />
      <label htmlFor="">Password</label>
      <input onChange={handleInput} name='password' type="password" value={user.password} />
      <button onClick={handleSubmit}>Login</button>
    </form>
  </>
}


export {RegisterForm, LoginForm}
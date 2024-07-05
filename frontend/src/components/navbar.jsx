import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
    <nav className='bg-blue-600 p-5 w-full border-cyan-800 flex justify-between'>
        <ul className='flex'>
            <li>
                <Link className='text-white text-decoration-none' to="/">Home</Link>
            </li>
        </ul>
        <div className='flex gap-5'>
            <li className='list-none'>
                <Link className='text-white text-decoration-none' to="/login">Login</Link>
            </li>

            <li className='list-none'>
                <Link className='text-white text-decoration-none' to="/register">Register</Link>
            </li>

            <li className='list-none'>
                <Link className='text-white text-decoration-none' to="/logout">Logout</Link>
            </li>
        </div>
    </nav>
    </>
  )
}

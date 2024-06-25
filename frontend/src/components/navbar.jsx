import React from 'react'

export const Navbar = () => {
  return (
    <>
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>

            <li>
                <Link to="/login">Login</Link>
            </li>

            <li>
                <Link to="/register">Register</Link>
            </li>

            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    </nav>
    </>
  )
}

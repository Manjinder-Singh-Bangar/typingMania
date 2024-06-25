import { useState } from 'react'
import { RegisterForm, LoginForm } from './components/Form.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Success, Failed } from './components/success.jsx';
import { VerifyEmail } from './components/verify.jsx';
import { Home } from './components/home.jsx';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/home/:username" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

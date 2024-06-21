import { useState } from 'react'
import { RegisterForm, LoginForm } from './components/Form.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Success } from './components/success.jsx';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

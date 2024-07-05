import { Navbar } from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import "./index.css"

function App() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default App

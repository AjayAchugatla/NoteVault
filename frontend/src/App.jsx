import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Landing from './pages/Landing.jsx'
import Delete from './pages/Delete.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import { Analytics } from "@vercel/analytics/react"
import Folder from './pages/Folder.jsx'
import Trash from './pages/Trash.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/dashboard' element={<Home />}></Route>
          <Route path='/folder/:id' element={<Folder />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/delete' element={<Delete />}></Route>
          <Route path='/trash' element={<Trash />}></Route>
          <Route path='/email-verify' element={<EmailVerify />}></Route>
          <Route path='/reset' element={<PasswordReset />}></Route>
        </Routes >
        <Analytics />
      </BrowserRouter>
    </>
  )
}

export default App

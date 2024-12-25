import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import AddNotes from './pages/AddNotes.jsx'
import Landing from './pages/Landing.jsx'
import ViewNote from './pages/ViewNote.jsx'
import EditNotes from './pages/EditNotes.jsx'
import Delete from './pages/Delete.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/dashboard' element={<Home />}></Route>
          <Route path='/note/*' element={<ViewNote />}></Route>
          <Route path='/edit/*' element={<EditNotes />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/add' element={<AddNotes />}></Route>
          <Route path='/delete' element={<Delete />}></Route>
          <Route path='/email-verify' element={<EmailVerify />}></Route>
          <Route path='/reset' element={<PasswordReset />}></Route>
        </Routes >
        <Analytics />
      </BrowserRouter>
    </>
  )
}

export default App

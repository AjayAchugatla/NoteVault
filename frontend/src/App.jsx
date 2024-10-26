import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import AddNotes from './pages/AddNotes.jsx'
import First from './pages/First.jsx'
import ViewNote from './pages/ViewNote.jsx'
import EditNotes from './pages/EditNotes.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<First />}></Route>
          <Route path='/dashboard' element={<Home />}></Route>
          <Route path='/note/*' element={<ViewNote />}></Route>
          <Route path='/edit/*' element={<EditNotes />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/add' element={<AddNotes />}></Route>
        </Routes >
      </BrowserRouter>
    </>
  )
}

export default App

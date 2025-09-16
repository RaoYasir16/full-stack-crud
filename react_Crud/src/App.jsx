
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import User from './pages/User'
import { NewUser } from './pages/NewUser'
import UpdateUser from './pages/UpdateUser'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <PrivateRoute> <User/> </PrivateRoute>}/>
      <Route path='/new-user' element = { <PrivateRoute> <NewUser/> </PrivateRoute>}/>
      <Route path="/update-user/:id" element={ <PrivateRoute><UpdateUser/> </PrivateRoute> }/>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login />} />
    
      
      
    
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

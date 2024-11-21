import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './login/login';
import { Chat } from './chat/Chat';
import { Register } from './login/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

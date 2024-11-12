import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './login/login';
import { Index } from './webpages/index'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

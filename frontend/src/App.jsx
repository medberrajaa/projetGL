import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Login } from './login'

function App() {

  async function def(){
    await axios.get("http://127.0.0.1:8000/").then(function(response){
      console.log(response.data)
    }).catch(function(error){
      console.log(error)
    });
    
  }

  useEffect(()=>{
    def();
  },[])

  return (
    <>
      <Login></Login>
    </>
  )
}

export default App

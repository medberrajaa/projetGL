import React from 'react'
import { useEffect , useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export const Navbar = () => {
  const [connected, setConnected] = useState(null);
  const [userName, setUserName] = useState("")
  useEffect(()=>{
    if(window.localStorage['token'] != null){
      let token = window.localStorage['token']
      let decoded_token = jwtDecode(token)
      setUserName(decoded_token['userFName'])
      if(Date.now() <= decoded_token['exp'] * 1000){
        setConnected(true)
      }else{
        setConnected(false)
      }
    }else{
      setConnected(false)
    }
  },[])
  if(connected){
    return (
      <div>
        <button onClick={()=>{
                                localStorage.removeItem("token");
                                setConnected(false);
                                window.location.reload();
                              }
                            }>Disconnect</button>
        <h1>{userName}</h1>
      </div>
    )
  }else{
    return (
      <div>
        <button><a href="/login">Login</a></button>
        <button><a href="/register">Register</a></button>
      </div>
    )
  }
}

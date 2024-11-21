import React, { useState }from 'react'
import axios from 'axios';
import { Navigate , useNavigate } from "react-router-dom";


export const Login = () => {
    if (localStorage.getItem("token") === null) {
      const navigate = useNavigate()
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      async function handleSubmit(e){
        e.preventDefault();
        await axios.post("http://localhost:8081/user/Connection",{"email":email,"password":password}).then(function(response){
          if(response.data.message && response.data.message == "User not found"){
            console.log("user not found")
          }
          else{
            localStorage.setItem("token",response.data['token'])
            navigate("/")
          }
        })
      }
      return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
      )
    }else{
      return <Navigate to="/" />
    }
}

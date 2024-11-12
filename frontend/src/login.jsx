import React, { useState } from 'react'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    async function handleSubmit(e){
    e.preventDefault();
    await axios.post("http://localhost:8081/user/Connection",{"email":email,"password":password}).then(function(response){
        console.log(response.data)
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
}

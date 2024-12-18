import React, { useState }from 'react'
import axios from 'axios';
import { Navigate , useNavigate } from "react-router-dom";
import { hash } from '../hash_pass/hash';
export const Login = () => {
    if (localStorage.getItem("token") === null) {
      const navigate = useNavigate()
      const [input, setInput] = useState({
        email:"",
        password: "",
      });
      const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      async function handleSubmit(e){
        e.preventDefault();
        input.password = await hash(input.password)
        await axios.post("http://localhost:8081/user/Connection",{ input }).then(function(response){
          if(response.data.message && response.data.message == "User not found"){
            console.log("user not found")
          }else{
            localStorage.setItem("token",response.data['token'])
            navigate("/")
          }
        })
      }
      return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleInput}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleInput}/>
                <button type="submit">Submit</button>
            </form>
        </div>
      )
    }else{
      return <Navigate to="/" />
    }
}

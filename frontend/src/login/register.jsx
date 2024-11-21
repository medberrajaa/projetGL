import { Navigate , useNavigate } from "react-router-dom";
import { useState } from 'react'
import { hash } from "../hash_pass/hash";
import axios  from "axios"
export const Register = () => {
    const navigate = useNavigate()
    if (localStorage.getItem("token") === null) {
        const [input, setInput] = useState({
          fname: "",
          lname:"",
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
          await axios.post("http://localhost:8081/user/CreateUser",{ input }).then(function(response){
            if(response.data.message === "User already has account"){
              alert("already has account")
            }else{
              navigate("/login")
            }
          })
        }
        return (
          <div>
              <form onSubmit={handleSubmit}>
                  <label htmlF="fname">First Name</label>
                  <input type="text" name="fname" id="fname" onChange={handleInput}/>
                  <label htmlF="Lname">Last Name</label>
                  <input type="text" name="lname" id="lname" onChange={handleInput}/>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" onChange={handleInput}/>
                  <label htmlFor="age">age</label>
                  <input type="number" name="age" id="age" onChange={handleInput}/>
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

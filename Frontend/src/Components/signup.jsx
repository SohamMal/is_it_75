import { useNavigate } from "react-router-dom";
import logo from "../images/isit75.png"
import { useState } from "react";

export function SignUp(){
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [responseMsg, setResponseMsg] = useState('');

    const navigate=useNavigate();
    async function handleSubmit(){
        const responseBody={
            username,
            password
        }
        try{
            const response=await fetch('https://is-it-75.onrender.com/signup',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(responseBody)
            });
            const value=await response.json();
            if(value){
                setResponseMsg(value.msg);
                if(value.token){
                    localStorage.setItem('token', value.token);
                    navigate('/home');
                }
            }
        }catch(e){
            setResponseMsg('Server Error');
        }
    }

    return (
        <div className="outer-container">
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img"/>
                </div>
                {/* <h3>Sign In</h3> */}
                <input type="email" placeholder="Enter Email" onChange={
                    e=>{
                        setUsername(e.target.value);
                    }
                }/>
                <input type="password" placeholder="Enter Password" onChange={
                    e=>{
                        setPassword(e.target.value);
                    }
                }/>
                <button type="submit" onClick={()=>{
                    handleSubmit();
                }}>Sign Up</button>
            {responseMsg && <p>{responseMsg}</p>}
            </div>
        </div>
    );
}
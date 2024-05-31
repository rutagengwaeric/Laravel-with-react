import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [error, setError] = useState(null);

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }else if(response && response.status === 401){
            setError('Incorrect email or password.');
        }
    });
}

  return (
    <div className="login-signup-form animated fadeinDown">
        <div className="form">
          {error &&
          <p style={{color: 'red', textAlign:'center' , marginBottom:'3px'}}>
            {error}
            </p>
           }
            <h1 className="title"> Login to Your Account</h1>
            <form action="" onSubmit={Submit}>
              <input ref={emailRef} type="email" placeholder="Email" />
              <input ref={passwordRef}type="password" placeholder="Password" />
              <button className="btn btn-block">Login</button>
              <p className="message">Not registed ? <Link to='/register'>Create New Account</Link></p>
            </form>
        </div>
    </div>
  )
}

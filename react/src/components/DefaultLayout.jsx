import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axiosClient";


export default function DefaultLayout() {
    const {user, token, setUser,setToken} = useStateContext();

    if(!token){
      return  <Navigate to='/login' />
    }
    const onLogout = (ev) =>{
        ev.preventDefault();
      axiosClient.get('/logout')
        .then(({}) =>{
           setUser(null)
           setToken(null)
        })

    }

    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data}) =>{
           setUser(data)
        })
    },[])

  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
            <div>Header</div>
            <div>
                {user.name} &nbsp;&nbsp;
                <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
        </header>

        <main>
           <h1 style={{ textAlign:"center"}}> Welcome to React with Laravel app</h1>
        <Outlet />
        </main>
      </div>

    </div>
  )
}

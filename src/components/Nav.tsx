import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import {  useAuthuser } from "../user/UserContext";


//const Navbar = (props:{user: {"firstName":"", "lastName":"","email":""}, 
                       // setUserN:(user: {"firstName":"", "lastName":"","email":""}) => void}) => {

                    

 const Navbar = (props:{name: String, setName:(name: any) => void}) => {
    //const userContext = useContext(UserContext2)             

    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState("")
    //const [user, setUser] = useState({"firstName":"", "lastName":"","email":""})
    const authUser = useAuthuser();
    const [name, setName] = useState('')
    //const userContext = useContext(UserContext)

    let menu;

    useEffect(()=>{
        console.log("The name in nav is ...", name)
    },[name])  


    const logout = async (e:SyntheticEvent) => {
        authUser ?.setUser(null)

        const response = await fetch("http://localhost:8086/api/logout", {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({
                email
                
            })
        }).then(resp => {
            props.setName('a')
            
            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
            resp.json().then(d => {
                console.log("Received auth data ..user ..", d.data.user ); 
                console.log("Received auth data ..message ..", d.message ); 
                console.log("Received auth data .. ..", d.statusCode); 
               // setUser(d.data.user);
                

                if(d.statusCode== 200) {
                    setRedirect(true)
                    //setAuthMessage("Authentication succeeded")
                    //Cookies.set("reloaded", "false");

                } else {
                    //setAuthMessage("Logout failed")
                }
            }

            )
            console.log("Received auth data", resp);

        } else {
            console.log("Authenthication failed")
            props.setName('a')
            setName('a')
        }
           
        }).catch(err => {
            console.log("Authenthication failed")
            props.setName('a')
            setName('a')
        })
    }

 
            if(authUser?.user?.firstName.length) {
            
        menu = (
            <div className="collapse navbar-collapse float-right" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 float-right">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" aria-current="page">..</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link active" aria-current="page" >..</Link>
                </li>
            </ul>
           

            <form className="form-inline mt-2 mt-md-0">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 float-right">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" aria-current="page" 
                    onClick={e=>logout(e)}> Logout</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link active" aria-current="page" >
                        {authUser?.user.lastName}  {authUser?.user?.firstName}  </Link>
                </li>
            </ul>
               
            </form>
            </div>
        )
    } else {

        menu = (
            <div className="collapse navbar-collapse float-right" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0 float-right">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link active" aria-current="page">..</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page" >..</Link>
                    </li>
                </ul>
                
        
                <form className="form-inline mt-2 mt-md-0">
                <ul className="navbar-nav me-auto mb-2 mb-md-0 float-right">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page" >Register</Link>
                    </li>
                </ul>
                   
                </form>
                </div>
        )
    }


    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to ="/" className="navbar-brand" >Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {menu}
        
            </div>
            </nav>
        </div>
    )
}

export default Navbar
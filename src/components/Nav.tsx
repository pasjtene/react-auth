import { stringify } from "querystring";
import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import {  useAuthuser } from "../user/UserContext";
import { useThemeContext } from "./context/ThemeContext";


 const Navbar = (props:{name: String, setName:(name: any) => void}) => {
    //const userContext = useContext(UserContext2)             

    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState("")
    const authUser = useAuthuser();
    const [name, setName] = useState('')
    const theme = useThemeContext()


    let menu;

    useEffect(()=>{
        console.log("The name in nav is ...", name)
    },[name])  

    //const Theme1 = (e:SyntheticEvent) => {
        // get color code from: https://coolors.co/palettes/trending
        const chanTheme = (e:any) => {
        e.preventDefault()
       //console.log(e.currentTarget.color)
       //console.log(e.currentTarget.dataset.color)
        const backgroundColor: string = e.currentTarget.id
        const textc: string = e.currentTarget.dataset.color
        theme?.setTheme({
            bgColor: backgroundColor,
            textColor: textc||'#fff'
          })  
     }



    const logout = async (e:SyntheticEvent) => {
        authUser.setUser(null)

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
                //console.log("Received auth data ..user ..", d.data.user ); 
                //console.log("Received auth data ..message ..", d.message ); 
                //console.log("Received auth data .. ..", d.statusCode); 
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
                <li style={{marginRight: "20px"}}>
                                    <div className="dropdown-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {authUser?.user?.firstName} {authUser?.user.lastName}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Action two</a></li>
                        <li><a className="dropdown-item" href="#">Action three</a></li>
                        <li>
                            <Link to="/login" className="nav-link active dropdown-item" aria-current="page" 
                                onClick={e=>logout(e)}> Logout</Link>
                        </li>
                    </ul>
                    </div>

                </li>
                <li style={{marginRight: "20px"}}>
                    <div className="dropdown-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Select theme
                    </button>
                    <ul className="dropdown-menu"> 
                        <li id={"#5f0f40"}><a className="dropdown-item" id={"#5f0f40"} style={{backgroundColor:"#5f0f40", color:"#fff"}} onClick={(e)=>{chanTheme(e)}} href="#">Theme 1</a></li>
                        <li><a className="dropdown-item" id="#5465ff" style={{backgroundColor:"#5465ff", color:"#fff"}}  onClick={(e)=>{chanTheme(e)}}  href="#">theme 2</a></li>
                        <li><a className="dropdown-item" id="#463f3a" style={{backgroundColor:"#463f3a", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 3</a></li>

                        <li><a className="dropdown-item" id="#386641" style={{backgroundColor:"#386641", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 4</a></li>

                        <li><a className="dropdown-item" id="#000" style={{backgroundColor:"#000", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 5</a></li> 

                        <li><a className="dropdown-item" id="#f7f7f2" data-color="#000"  style={{backgroundColor:"#f7f7f2", color:"#000"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#000">theme 5</a></li> 
                    </ul>
                    </div>
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

                <li style={{marginRight: "20px"}}>
                    <div className="dropdown-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Select theme
                    </button>
                    <ul className="dropdown-menu"> 
                        <li id={"#5f0f40"}><a className="dropdown-item" id={"#5f0f40"} style={{backgroundColor:"#5f0f40", color:"#fff"}} onClick={(e)=>{chanTheme(e)}} href="#">Theme 1</a></li>
                        <li><a className="dropdown-item" id="#5465ff" style={{backgroundColor:"#5465ff", color:"#fff"}}  onClick={(e)=>{chanTheme(e)}}  href="#">theme 2</a></li>
                        <li><a className="dropdown-item" id="#463f3a" style={{backgroundColor:"#463f3a", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 3</a></li>

                        <li><a className="dropdown-item" id="#386641" style={{backgroundColor:"#386641", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 4</a></li>

                        <li><a className="dropdown-item" id="#000" style={{backgroundColor:"#000", color:"#fff"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#">theme 5</a></li> 

                        <li><a className="dropdown-item" id="#f7f7f2" data-color="#000"  style={{backgroundColor:"#f7f7f2", color:"#000"}} 
                        onClick={(e)=>{chanTheme(e)}} href="#000">theme 5</a></li> 
                    </ul>
                    </div>
                </li>

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
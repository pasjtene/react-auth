import React from 'react';
import { useEffect, useState, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Navbar from './components/Nav';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import {BrowserRouter as Router}  from "react-router-dom";
import { Authuser, useAuthuser, UserContextProvider } from './user/UserContext';
import { User } from './user/User';
import { ThemContextProvider } from './components/context/ThemeContext';
import { Box } from './components/context/Box';
import LeftNav from './pages/LeftNav';
import NoPage from './pages/NoPage';
import FontAwesome from 'react-fontawesome';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Task from './components/task/Task';
import Cookies from 'js-cookie';
import AppService from './services/AppService';


function App() {
  const [user, setUser] = useState({} as Authuser)
  const [isuserAuth, setUserAuth] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const authUser = useAuthuser();
  
  useEffect(()=>{
    (
        async () => fetch(AppService.app_url("/api/user"), {
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        }).then(resp => {
            
            const contentType = resp.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                
                resp.json().then(d=> {
                    
                    Cookies.set("uid",   d.data.user.id , { path: '' });
                    Cookies.set("utasks",   JSON.stringify(d.data.user), { path: '' });

                    setUser(d.data.user);
                    //setName(d.data.user.firstName)
                    if(d.data.user.id) {
                        setUserAuth(true);
                       
                         
                          setUser({
                            firstName:d.data.user.firstName,
                            lastName:d.data.user.lastName,
                            email: d.data.user.email,
                            roles: d.data.user.roles.map((r: { name: string; })=>r.name),
                            profileImagePath: d.data.user.profileImagePath,
                            tasks: d.data.user.tasks
                        })

                          console.log("The user is .. 7 ",authUser.user)
                  
                    }
                })
            } else {
                //console.log("User not found")
                //setName('')
            }
        }).catch(err=>{
            console.log("User not found",err)
            //setName('')
        })
    )();
},[])

  
console.log("From app, the auth user is 1.2..3 ",authUser)

const logMessage = (message: string) => {
  console.log(message);
  //setName(message)
};


  return (
    <div className="App">
    <UserContextProvider>
    <ThemContextProvider>
    <Router>
        <Navbar user={user}
                name={user.firstName}
                setName={function (name: any): void {}} 
        />               
              <Box/>         
              <div className="row">
                <div className="col-2 align-self-start">
                  <LeftNav user={user}/>
                </div>
                  <div className="col-10" style={{backgroundColor: "rgba(0, 0, 0, .1)"}}>
                  <Routes>
                        <Route path="/" element={ <Home user={user}/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/settings" element={<Settings  user={user}/>} />
                        <Route path="/profile" element={<UserProfile  user={user} page={"profile"}/>} />
                        <Route path="/tasks" element={<Task  user={user}/>} />
                        <Route path="*" element={<NoPage user={user}/>} />
                      </Routes>
                      </div>
              </div>      
              </Router>
    </ThemContextProvider>
   
    </UserContextProvider>
        
      </div>
  
    );
  }
  
  export default App; 
   
     

            

            
                       
                     
                 
          
                   
            
               
                
             
                
            
         

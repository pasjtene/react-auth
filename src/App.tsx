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
//import { AuthUserProvider } from './user/UserContext';
import { UserContextProvider } from './user/UserContext';
import { User } from './user/User';
//import { UserContext } from './user/UserContext';


function App() {
  const [user, setUser] = useState({"firstName":"", "lastName":"","email":""})
  const [isuserAuth, setUserAuth] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [name, setName] = useState('')
  //const userContext = useContext(UserContext)




const logMessage = (message: string) => {
  console.log(message);
  setName(message)
};


  return (
 
   
     
<div className="App">
  <UserContextProvider>
  <Router>
      <Navbar name={user.firstName} setName={function (name: any): void {
                      console.log("Setting name...", name)
                      setName(name)
                      //window.location.reload();
                    }} />
           
            
          <main className="form-signin w-100 m-auto">
          
          <Routes>
              <Route path="/" element={ <Home user={user}/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
            
          </main>
          </Router>
  </UserContextProvider>
      
    </div>

    
    
    
   

  );
}

export default App;

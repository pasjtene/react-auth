import React, { useEffect, useState, useContext } from "react";
//import { useAuthuser } from "../user/UserContext";
import Cookies from 'js-cookie';
import {  useAuthuser } from "../user/UserContext";


const Home = (props:any) => {
    const [user, setUser] = useState({"firstName":"", "lastName":"","email":""})
    const [isuserAuth, setUserAuth] = useState(false)
    const[isReloaded, setReloaded] = useState('')
    const[login, setLogin] = useState('false')
   const authUser = useAuthuser();
    //const userContext = useContext(UserContext2)
   


   useEffect(()=>{

    const reloaded = Cookies.get('reloaded');

    setReloaded("reloaded")

    console.log("The rrloaded is ", reloaded );

/*
    setTimeout(() => {
        if(reloaded  != "true"){

            console.log("Setting reloaded ", reloaded );
            
            //The cookie is set to false on login. The is to make sure we reload only once
            Cookies.set("reloaded", "true");
            setLogin("true")
           // window.history.pushState({}, null, "/api/login");

           //We need to reload to update the user in global context
            window.location.reload();
            
        } 
        
        }, 1000)

        */

   },[isReloaded])


   useEffect(()=>{
    (
        async () => fetch("http://localhost:8086/api/user", {
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        }).then(resp => {
            console.log()
            const contentType = resp.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                console.log("the resp", resp)
                resp.json().then(d=> {
                    console.log("the resp d", d.data)
                    setUser(d.data.user);
                    //setName(d.data.user.firstName)
                    if(d.data.user.id) {
                        setUserAuth(true);
                        //setName(d.data.user.firstName)
                       // if(userContext || d.data.user.id) {
                         // console.log("The usercontext is...",userContext)
                          authUser?.setUser({
                              firstName:d.data.user.firstName,
                              lastName:d.data.user.lastName,
                              email:d.data.user.email
                          })
                     // }
                    }
                })
            } else {
                console.log("User not found")
                //setName('')
            }
        }).catch(err=>{
            console.log("User not found",err)
            //setName('')
        })
    )();
},[])


   
   
 //f`ollowing can be omited in order to just use the user in global context
   


    return (
        <div>

            {authUser?.user?.firstName.length?<span>
                 {authUser?.user?.firstName} {authUser?.user?.lastName} {authUser?.user?.email} 
            </span>:
            <span>
                
                
                Home
            </span>
            
            }
             
        </div>
    )
}

export default Home
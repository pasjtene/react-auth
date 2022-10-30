import React, { useEffect, useState, useContext } from "react";
//import { useAuthuser } from "../user/UserContext";
import Cookies from 'js-cookie';
import {  useAuthuser } from "../user/UserContext";
import UserProfile from "./UserProfile";
import AppService from "../services/AppService";


const Home = (props:any) => {
    const [user, setUser] = useState({"firstName":"", "lastName":"","email":""})
    const [isuserAuth, setUserAuth] = useState(false)
    const[isReloaded, setReloaded] = useState('')
    
   const authUser = useAuthuser();
    //const userContext = useContext(UserContext2)
   
    const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length

   useEffect(()=>{

    const reloaded = Cookies.get('reloaded');

    setReloaded("reloaded")

    console.log("The rrloaded is ", reloaded );


   },[isReloaded])


   useEffect(()=>{
    (
        async () => fetch(AppService.app_url("/api/user"), {
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
                              email:d.data.user.email,
                              roles:d.data.user.roles.map((r: { name: string; })=>r.name),
                              profileImagePath: d.data.user.profileImagePath,
                              tasks:d.data.user.tasks
                          })

                          console.log("The user is .. 7 ",authUser.user)
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

            {isUserAuth()?<span>
                 {authUser.user?.firstName} {authUser?.user?.lastName} {authUser?.user?.email} {props.user?.lastName}
                  {authUser?.user?.roles.length?<div>User roles: {authUser?.user?.roles.map(r=> <div key={r}>{r}</div>)}</div>:null} 
            
            
            <UserProfile/>
            </span>:
            <span>
                
                
                Home
            </span>
            
            }
             
        </div>
    )
}

export default Home
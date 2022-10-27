import React, { useEffect, useState, useContext } from "react";
//import { useAuthuser } from "../user/UserContext";
import Cookies from 'js-cookie';
import {  useAuthuser } from "../user/UserContext";


const Settings = (props:any) => {
    const authUser = useAuthuser();
    const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length
   
    return (
        <div>

{ isUserAuth()?<span>
                {props.user?.firstName}  {props.user?.lastName} You can update your setting in this page
                  
            </span>:
            <span>
                
                The page you are looking for does not exist. You might want to login to get more from us....
               
            </span>
            
}
             
        </div>
    )
}


export default Settings
import React, { useEffect, useState, useContext } from "react";
//import { useAuthuser } from "../user/UserContext";
import Cookies from 'js-cookie';
import {  useAuthuser } from "../user/UserContext";


const NoPage = (props:any) => {
   
    return (
        <div>

{ props.user?.firstName?.length?<span>
              Hey   {props.user?.firstName}  {props.user?.lastName} The page you are looking for does not exist
                  
            </span>:
            <span>
                
                The page you are looking for does not exist. You might want to login to get more from us....
               
            </span>
            
}
             
        </div>
    )
}


export default NoPage
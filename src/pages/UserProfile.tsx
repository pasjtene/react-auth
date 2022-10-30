import React, { useEffect, useState, useContext } from "react";
//import { useAuthuser } from "../user/UserContext";
import Cookies from 'js-cookie';
import {  Authuser, useAuthuser } from "../user/UserContext";
import UploadFile from "../components/UploadFile";
import { useThemeContext } from "../components/context/ThemeContext";


const UserProfile = (props:any) => {
    const authUser = useAuthuser();
    const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length
    const [user,setUser] = useState({})
    const theme = useThemeContext()

    useEffect(()=>{
        if(authUser.user?.firstName?.length) setUser(authUser) 
        if(props.user?.firstName?.length) setUser(props.user) 

        console.log("The theme is ",theme)
        
    })
   
    return (
        <div>

{ isUserAuth()? 
<div>
<div className="row align-items-start d-flex" 
    style={{...theme.theme?.primary}}>
    <div className="col-3 align-self-start">
        <img className="imgthumbnaillg"  src={window.location.origin +"/images/"+ 
        (authUser.user?.profileImagePath || props.user?.profileImagePath)} />
    </div>
                            <div className="col-4" style={{fontSize:"40px", ...theme.theme?.primary}}>
                            {props.user?.firstName || authUser.user?.firstName}  {props.user?.lastName || authUser.user?.lastName} 
                            </div>
                        

                        </div>

                        {props.page=="profile"?
                        <div className="row"  style={{fontSize:"40px", ...theme.theme?.secondary}}>
                            Please upload some pictures to your profile

                            <UploadFile user={user}/>
                        </div>:null}
                    </div>:
               
                    <span>
                
                        The page you are looking for does not exist. You might want to login to get more from us....
               
                    </span>
}
          
</div>
    )
}
                

export default UserProfile
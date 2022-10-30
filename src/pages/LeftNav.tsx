import React, { SyntheticEvent, useEffect, useState } from "react"
import { useThemeContext } from "../components/context/ThemeContext";
import { Authuser, useAuthuser } from "../user/UserContext";
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHouse, faUser, faRestroom} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import UserService from "../services/UserService";


const LeftNav = (props:{user:Authuser}) => {
    const authUser = useAuthuser();
    const theme = useThemeContext()
    const [user, setUser] = useState({} as Authuser)

    const isUserAuth = ():number =>   authUser.user?.firstName?.length || props.user?.firstName?.length

    useEffect(()=> {
      console.log("The user image...", authUser.user?.profileImagePath?.length)
      console.log("The user props image...", props.user?.profileImagePath?.length)

      
      if(authUser.user?.firstName?.length)
      setUser(authUser.user)
      
      if(props.user?.firstName?.length)
      setUser(props.user)
     
    })

    
    const logout =(e:SyntheticEvent) => {
      console.log("The logout event ..",e)
      authUser.setUser(null)
      props.user.firstName = ""
      Cookies.remove('uid', { path: '' })
      Cookies.remove('utasks', { path: '' })
      return UserService.logOut();
   }

    return (

        isUserAuth()?<div>

<div className="flex-shrink-0  p-3 bg-white align-items-start d-flex flex-column" style={{width: "280px", ...theme.theme?.primary}}>
    <a href="/" className="d-flex align-items-start pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <div>
      {user?.profileImagePath?.length?
      <img className="imgthumbnail"  src={window.location.origin +"/images/"+ user?.profileImagePath} />:
      <FontAwesomeIcon icon={faUser} size="3x" />
  }
      <span style={{marginLeft:"20px"}} className="fs-5 fw-semibold"> {authUser.user?.firstName || props.user.firstName}</span>
      </div>
      
    </a>
    <ul className="list-unstyled ps-0 align-items-start d-flex flex-column">
      <li className="mb-1">
      <FontAwesomeIcon icon={faHouse}/>
      
        <button className="btn btn-toggle align-items-start rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
         Home
        </button>
        <div className="collapse show" id="home-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small align-items-start d-flex flex-column">
            <li><Link to="/tasks" className="link-dark rounded">My tasks</Link> </li>
            <li><a href="#" className="link-dark rounded">Updates</a></li>
            <li><a href="#" className="link-dark rounded">Reports</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
      <FontAwesomeIcon icon={faRestroom} />
        <button className="btn btn-toggle align-items-start rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Friends
        </button>
        <div className="collapse" id="dashboard-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small align-items-start d-flex flex-column">
            <li><a href="#" className="link-dark rounded">Overview</a></li>
            <li><a href="#" className="link-dark rounded">Weekly</a></li>
            <li><a href="#" className="link-dark rounded">Monthly</a></li>
            <li><a href="#" className="link-dark rounded">Annually</a></li>
          </ul>
        </div>
      </li>
     
      <li className="mb-1">
      <FontAwesomeIcon icon={faUser} />
        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small align-items-start d-flex flex-column">
            <li><a href="#" className="link-dark rounded">New...</a></li>
            
            <li> <Link to="/profile" className="link-dark rounded"> Profile</Link> </li>
            <li> <Link to="/settings" className="link-dark rounded"> Settings</Link> </li>
            <li> <Link to="/login" className="link-dark rounded" onClick={e=>logout(e)}> Sign out</Link> </li>
            
                                
              
          </ul>
        </div>
      </li>
    </ul>
  </div>

        </div>: <div>
                    <div className="panel panel-primary" style={{marginTop:"10px",...theme.theme?.primary}}>
                        <div className="panel-heading" style={{...theme.theme?.primary }}>Help section</div>
                            <div className="panel-body">Please sign in to see the full power of this app. You can create an account, then you need to sign in
                                the things you can do depend on your Role, you can assign some roles to yourself.. and much more
                            </div>
                        </div>
            
            
        </div>
    )
        
}

export default LeftNav
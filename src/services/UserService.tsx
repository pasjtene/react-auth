import axios from "axios";
import Cookies from 'js-cookie';
import AppService from './AppService'
import {Authuser,  useAuthuser } from '../user/UserContext'
axios.defaults.withCredentials = true;
const API_SERVER = 'http://localhost:8085/api';

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER,
    })
    
   
const mylocation = window.location.origin;



class UserService {
    //axios.defaults.withCredentials = true
    
    User = {
        "firstName":"",
        roles:[]
    }


    getAuthCookie() {
        const auth = Cookies.get('isUserAuth');
        return auth;
    }


    getAuthUser() {
        //const authUser = Cookies.get('un');

        return axios.post(AppService.app_url("/api/user"),
        {
             headers: { 'Content-Type': 'application/json'}
     
       });

    }


    getUserById(id:number) {
        //const authUser = Cookies.get('un');

        return axios.post(AppService.app_url("/api/user/details"), id,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });

    }



    hasRole(role:string) {
        console.log("The user roles..", Cookies.get('userRoles'))
        const r = Cookies.get('userRoles');
        if(r != "undefined") {
            console.log("The roles are..ssss..", r)
            //return false;
        } else {
            console.log("The roles are..s..", r)
        }
        
        

        //const roles = JSON.parse(Cookies.get('userRoles')?Cookies.get('userRoles'):false);

        const roles = ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"]

        if(roles) {
            for (var i = 0; i < roles.length; i++) {
        
                if (roles[i] === role) {
                    return true;
                }
            }

        }
       
    
        return false;
        
    }

    hasRolev1(role:string, roles:string[]) {
        //receives the user Roles and check if it has the provided role
        //This is used to display only the roles that the user does not already have
        //Can be used to give access to the user based on their roles
        //console.log("The roles", roles);

        if(roles) {
            for (var i = 0; i < roles.length; i++) {
                
                if (roles[i] === role) {
                    return true;
                }
            }

        }
       
        return false;
        
    }


    getUsers() {
        return axios.get(AppService.app_url("/api/users"))
    }
    
    

    getRoles() {
        return axios.get(AppService.app_url("/api/roles"))
    }
    
    

    addRolesToUser(data:Array<number>) {
        return axios.post(AppService.app_url("/api/addrolestouser"), data,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });
    
    }

    removeUserRoles(data:Array<number>) {
        return axios.post(AppService.app_url("/api/removeuserrole"), data,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });
    
    }


    logOut () {
        //const authUser = useAuthuser();
        //authUser.setUser(null)
        //props.user.firstName = ""
        Cookies.remove('uid', { path: '' })
        Cookies.remove('utasks', { path: '' })
        return axios.get(AppService.app_url("/api/logout"))
    }


    uploadFile(data:FormData) {
      
        return axios.post(AppService.app_url("/api/uploadfile"), data, {
            headers: { 'Content-Type': 'multipart/form-data'}
    
      });

    }


    registerUser(data:{}) {
        return axios.post(AppService.app_url("/api/register"), data,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });
    }

    updateUser(data:{}) {
        return axios.post(AppService.app_url("/api/update"), data,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });
    }





    authenticate(data:{}) {

        const instance = axios.create({
            withCredentials: true
          })
        return instance.post(AppService.app_url("/api/authenticate"), data, { headers: { 'Content-Type': 'application/json'} });
    }



    deleteUsersCSV(data:number[]) {


        return axios.post(AppService.app_url("/api/deleteusers"), data, 
            { headers: {  Authorization: true}, withCredentials: true } 
            );
    }
    
    
}

export default new UserService();
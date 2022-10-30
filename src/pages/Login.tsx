import React, { SyntheticEvent, useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuthuser } from "../user/UserContext";

import { json } from "stream/consumers";
import Home from "./Home";
import AppService from "../services/AppService";

const Login =()=> {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({})
    //const [user2, setUser2] = useState({"firstName":"", "lastName":"","email":""})
    const [authMessage, setAuthMessage] = useState("Please sign in")

    const authUser = useAuthuser();
    //const userContext = useContext(UserContext2)
    

    //const userContext = useContext(UserContext2)

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch(AppService.app_url("/api/authenticate"), {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        }).then(resp => {
            //console.log(JSON.stringify(resp))
            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
            resp.json().then(d => {
                console.log("Received auth data ..user ..", d.data.user ); 
                console.log("Received auth data ..message ..", d.message ); 
                console.log("Received auth data .. ..", d.statusCode); 
                setUser(d.data.user);
                    Cookies.set("uid",   d.data.user.id , { path: '' });
                    Cookies.set("utasks",   JSON.stringify(d.data.user), { path: '' });

                    authUser.setUser({
                        firstName: d.data.user.firstName,
                        lastName: d.data.user.lastName,
                        email: d.data.user.email,
                        roles: d.data.user.roles.map((r: { name: string; })=>r.name),
                        profileImagePath: d.data.user.profileImagePath,
                        tasks:d.data.user.tasks
                    })
               // }

                console.log("The usercontext 4  is...",authUser?.user)
                

                if(d.statusCode== 200) {
                    setRedirect(true)
                    setAuthMessage("Authentication succeeded")
                    Cookies.set("reloaded", "false");

                } else {
                    setAuthMessage("Authentication failed")
                }
            }

            )
            //console.log("Received auth data", resp);


            
        } else {
            console.log("Authenthication failed")
        }
           
        }).catch(err => {
            console.log("Authenthication failed")
        })
    }

   if(redirect) 
   //return <Home user={user}/>
  return <Navigate to="/"/>


    return (
        <div>
            <main className="form-signin form-signin-size w-100 m-auto">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">{authMessage}</h1>
                    <div className="form-floating">
                    <input type="email" className="form-control"  placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label className="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control"  placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label className="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                </form>
            </main>
        </div>
    )
};

export default Login;
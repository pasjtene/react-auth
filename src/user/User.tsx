import { useContext } from "react"
import { UserContext, useAuthuser } from "./UserContext"
import { ITask } from "../components/task/taskinterface"


export const User = () => {
    //const userContext = useContext(UserContext)
    const authUser = useAuthuser()
    const handleLogin = () => {
       // if(userContext) {
            authUser?.setUser({
                firstName: "Pas",
                lastName: "Jtpas",
                email: "jt@j.com",
                roles:["ADMIN"],
                profileImagePath:"",
                tasks: []
            })
       // }
    }

    const user = {
        firstName: "",
        lastName: "",
        email: "",
        roles: [],
        profileImagePath: "",
        tasks: []
    }
    
    const handleLogout = () => {
        //if(userContext) {
            authUser?.setUser(null)
       // }
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>user name is {authUser?.user?.firstName} {authUser?.user?.lastName} {authUser?.user?.firstName}
             {authUser?.user?.email} </div>
        </div>
    )
}
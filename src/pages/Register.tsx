import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log({
            firstName,
            lastName,
            email,
            password
        })

        const response = await fetch("http://localhost:8086/api/register",
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        }).then(resp => {
            //const content = await response.json();
            console.log( resp)
            setRedirect(true)
        }
            

        );
                
        

    }

    if(redirect)
    return <Navigate to="/login" replace={true} /> 
    
    


    return (
        <div>
            
            <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control"  placeholder="Firt name"
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <label className="floatingInput">Firt name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control"  placeholder="Last name"
                            onChange={e => setLastName(e.target.value)}
                        />
                        <label className="floatingInput">Lasttt name</label>
                    </div>

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
        </div>
    )
}

export default Register
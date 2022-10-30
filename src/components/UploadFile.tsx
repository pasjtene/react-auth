import React, { useEffect, useState, useContext, useRef, SyntheticEvent } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {  Authuser, useAuthuser } from "../user/UserContext";

const mylocation = window.location.origin;

const LOCAL_FILE_UPLOAD_URL = "http://localhost:8086/api/uploadfile";
const FILE_UPLOAD_URL = "http://51.68.196.188:8080/talodu/api/uploadfile";
const IMAGE_URL = "http://51.68.196.188:8080";

axios.defaults.withCredentials = true;


const UploadFile  = (props:any) => {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setFile] = useState<File>();
    const [result, setUploadResult] = useState("");
    const [profileImagePath, setProfileImagePath] = useState(0);
    const [userImages, setUserImages] = useState([]);
    const authUser = useAuthuser();
    const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length
    const fileInput = useRef<HTMLInputElement>(null);
    //let ref:HTMLInputElement

    const [user,setUser] = useState<Authuser | {}>()

    useEffect(()=>{
        //if(authUser.user?.firstName?.length) setUser(authUser) 
        //if(props.user?.firstName?.length) setUser(props.user) 

       
        if(authUser.user?.firstName?.length) {
            
        }
        
        
        setUser(authUser) 
        if(props.user?.firstName?.length) {
            authUser.setUser({
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                email: props.user.email,
                roles: props.user.roles.map((r: { name: string; })=>r.name),
                profileImagePath: props.user.profileImagePath,
                tasks: props.user.tasks
            })
        }
      
        
    },[props.user.profileImagePath])


    function handleFileUploadClick(e:SyntheticEvent) {
        e.preventDefault();
        console.log("The file is.cemail..", props.user.email);
        fileInput?.current?.click();
    }

    const updateProgress = (c:any) => {
        setProgress(c);
      }

    const fileSelectedHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        console.log("The file is.cemail..", props.user.email);
        if (!fileList) return;
        setFile(fileList[0]);
        
    }


    const fileUploadHandler = async (ev:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        ev.preventDefault();
        const fd = new FormData();
        if(selectedFile) {
            fd.append("File", selectedFile, selectedFile.name);
            fd.append("Email", props?.user?.email);
            
        }
       
      

        if(mylocation === "http://localhost:3000") {

            //axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                try { 
                    const resp = await axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                onUploadProgress: e => {
                    console.log("loaded progress " +  Math.round (e.total?(e.loaded / e.total)*100:0) + "%");
                    
                    updateProgress(Math.round (e.total?(e.loaded / e.total)*100:0));
                    
                }
            }
            );


                if (resp.status === 201)  {

                    console.log("The response status is 201, file upload success");
                    console.log(resp.data);

                    authUser.setUser({
                        firstName: resp.data.firstName,
                        lastName: resp.data.lastName,
                        email: resp.data.email,
                        roles: resp.data.roles.map((r: { name: string; })=>r.name),
                        profileImagePath: resp.data.profileImagePath,
                        tasks: resp.data.tasks


                    })

                    //updateUser(resp.data);
                    //setUpdatedUser(resp.data);
                
                    console.log(resp.data.profileImagePath);

                //this.setState({result: "File uploaded successfully"});
                setUploadResult("File uploaded successfully")
               
                
                }

                if (resp.status === 505)  {

                    //this.setState({result: "File uploaded Failed. The file is too big"});
                    setUploadResult("File uploaded Failed. The file is too big")
    
                    }

            

        } catch (err:any) {

            console.log("File upload failled ");
            console.log(err.response.status);

            if(err?.response?.status === 505) {
                //this.setState({result: "Upload failed. The file is too big."});
                setUploadResult("Upload failed. The file is too big.")
            }

        }

        } else {

        
            try { 
                const resp = await     axios.post(FILE_UPLOAD_URL, fd, {
                    onUploadProgress: e => {
                        console.log("loaded progress " +  Math.round (e.total?(e.loaded / e.total)*100:0) + "%")
                        //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                        updateProgress(Math.round (e.total?(e.loaded / e.total)*100:0));
                        //setProgress(Math.round ((e.loaded / e.total)*100));
                    }
                }

            );


            } catch (err) {

                console.log("File upload failled ");
                console.log(err);

            }

        }


    }



    return (
        <div>

{ isUserAuth()?<div style={{display: "flex", flexDirection:"column"}}>
          
          <input style={{display: "none"}} 
          type="file" 
          onChange={(e) => {e.preventDefault(); fileSelectedHandler(e)}}
          //ref={fileInput => this.fileInput = fileInput}
          ref={fileInput} 
          />
          <div style={{display: "flex"}}>
          <button style={{width: "200px",fontSize:"20px"}} 
          onClick={(e)=>{e.preventDefault(); handleFileUploadClick(e)}}
          >chose a file 
           </button>
           <h5>{selectedFile?selectedFile?.name:""}</h5> 
          </div>
          

           <div style={{display: "flex"}}>
           <button style={{width: "200px",fontSize:"20px"}}
              onClick={(e)=>{e.preventDefault();  fileUploadHandler(e)}}>Upload</button>
              
              {selectedFile?<h5>Upload progress: {progress} % </h5> :""}
              </div>

          

          <div>
          <h5>{result}</h5> 
          </div>
          <div>
            The image
              <img className="imgthumbnaillg"  src={window.location.origin +"/images/"+ 
              (authUser.user?.profileImagePath || props.user.profileImagePath)} />
              
              <img className="imgthumbnail"  src= {  require("../img/Photo-ID-2.jpg")} />
          </div>

          
      </div>:
            <span>
                
                The page you are looking for does not exist. You might want to login to get more from us....
               
            </span>
            
}
             
        </div>
    )
}


export default UploadFile 
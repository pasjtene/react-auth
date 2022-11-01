import axios, { AxiosResponse } from "axios";
import Cookies from 'js-cookie';
import { FC } from "react";
import AppService from "../../services/AppService";
import { ITask } from "./taskinterface";

axios.defaults.withCredentials = true;


class TaskService  {

    deleteTask (id:number)  {

    const resp = axios.post(AppService.app_url("/api/task/delete"), id,
    {
         headers: { 'Content-Type': 'application/json'}
 
    });
     

    return resp


    }


}


export default new TaskService()
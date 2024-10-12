

import { API_URL } from "@/constants/config";
import axios from "axios";


const  getServerWithoutData=(url:string)=>{
        return fetch(API_URL+url,{
            method:"get",
        })  
}

const getServerWithData=(url:string,data:any)=>{
    return fetch(API_URL+url,{
        method:"get",
        body:data
    })
}

const getServerWithToken=(url:string,token:string)=>{
    return fetch(API_URL+url,{
        method:"get",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}

const postServerWithData=(url:string,data:any)=>{
    return fetch(API_URL+url,{
        method:"post",
        body:data
    })
}

const postServerWithToken=(url:string,token:string,data:any)=>{
    return fetch(API_URL+url,{
        method:"post",
        headers:{
            "Authorization":`Bearer ${token}`
        },
        body:data
    })
}

const whetherAdmin=async (UserId:string|null)=>{
    // use axios
    // const response = await axios.get(API_URL+"/user/admin",{
    //     headers:{
    //         "UserId":UserId
    //     }
    // })
    // return response.data
    return true
}

export {
    getServerWithoutData,
    getServerWithData,
    getServerWithToken,
    postServerWithData,
    postServerWithToken,
    whetherAdmin
}






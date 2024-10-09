import axios from 'axios';
import {API_URL} from '@/constants/config';

export default async function sendVerificationCode(email: string) {
    console.log("发送验证码", email);
    const data={
        email: email,
        type: "reset"
    }
    try{
        const response = await axios.post(`${API_URL}/verification`, data);
        console.log(response.data);
    }
    catch(error){
        console.error("发送验证码失败", error);
        throw error;
    }
}
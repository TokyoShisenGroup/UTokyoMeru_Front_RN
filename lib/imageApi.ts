// SMMSApiClient.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface TokenResponse {
    success: boolean;
    code: string;
    message: string;
    data: {
        token: string;
    };
    RequestId: string;
}

interface UploadResponseData {
    file_id: number;
    width: number;
    height: number;
    filename: string;
    storename: string;
    size: number;
    path: string;
    hash: string;
    url: string;
    delete: string;
    page: string;
}

interface UploadResponse {
    success: boolean;
    code: string;
    message: string;
    data: UploadResponseData;
    RequestId: string;
}

class SMMSApiClient {
    private APITOKEN = ""
    private axiosInstance: AxiosInstance;
    private baseUrl: string = 'https://sm.ms/api/v2';

    constructor( private apitoken: string) {
        this.APITOKEN = apitoken
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
        });
    }

    /**
     * 认证并获取 API Token
     */

    /**
     * 上传图片到 SM.MS
     * @param uri - 图片的本地 URI
     * @returns 上传的图片数据
     */
    public async uploadImage(uri: string): Promise<UploadResponse> {

        // 获取文件名
        const filename = uri.split('/').pop() || 'image.jpg';

        // 获取文件类型
        const fileType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';

        // 创建 FormData 对象
        const formData = new FormData();
        formData.append('smfile', {
            uri,
            type: fileType,
            name: filename,
        } as any);
        // 发送请求
        const response = await axios.post('https://sm.ms/api/v2/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.APITOKEN, // 使用获取的 API Token
            },
        });

        return response.data as UploadResponse;
    }
}

export default SMMSApiClient;

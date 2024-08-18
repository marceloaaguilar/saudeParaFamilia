import axios, {AxiosRequestConfig, Method} from "axios";

interface RequestOptions {
    method: Method;
    url: string;
    headers?: Record<string, string>;
    data?: any;
}


export const sendRequest = async ({method, url, headers, data}: RequestOptions) => {
    
    try{
        const config: AxiosRequestConfig = {
            method,
            url,
            headers,
            data
        }
        
        const response = await axios(config);
        return response.data;
    }
    catch(error){
        console.error("Error ao enviar a requisição: ", error);
        throw error;
    }

}
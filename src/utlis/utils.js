import axios from "axios";
import { baseUrl } from "../Components/MainComponents/MainComponent";

export const requestAPI = async (method, url, data, params) => {
    const AuthToken = localStorage.getItem('authToken') || "ToAp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1NzRmZDQ2MTg3YjMzNDA5N2UxMjYiLCJpYXQiOjE2NDg3MjE2NDV9.MFPjHv2bHpBTG046_nwdA11FGx9seY15RHP2AaJtBCE";

    const promise = await axios({
        method: method,
        url: `${baseUrl}${url}`,
        params: params,
        data: data,
        headers: {
          authToken: AuthToken
        }
      })
    
      return promise;
}

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('name');
  window.location.reload();
}
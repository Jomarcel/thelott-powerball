import axios from "axios";
import { ILottoApiBody, LottoResults } from "../types/lotto-picks";
import { API_URL } from "../constants";

// axios.interceptors.request.use(
//     async (config) => {
//         config.baseURL = `${}`
//         config.headers = config.headers || {}
//         config.headers['Content-Type'] = 'application/json'
//         config.headers.Accept = 'application/json'
//         return config
//     },
//     (err) => {
//         return Promise.reject(err)
//     }
// )

export const getLottoPicks = async (body: ILottoApiBody): Promise<LottoResults> => {
    const { data } = await axios.post(API_URL, body);
    return data
};

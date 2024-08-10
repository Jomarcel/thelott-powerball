import axios from "axios";
import { ILottoApiBody, LottoResults } from "../types/lotto-picks";
import { API_URL } from "../constants";

export const getLottoPicks = async (body: ILottoApiBody): Promise<LottoResults> => {
    const { data } = await axios.post(API_URL, body);
    return data
};

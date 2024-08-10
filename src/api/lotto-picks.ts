import { ILottoApiBody, LottoResults } from "../types/lotto-picks";
import axiosConfig from "../services/axiosConfig";

export const getLottoPicks = async (body: ILottoApiBody): Promise<LottoResults> => {
    const { data } = await axiosConfig.post('/sales/vmax/web/data/lotto/latestresults', body);
    return data
};

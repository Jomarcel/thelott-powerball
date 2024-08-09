import { useQuery } from "@tanstack/react-query";
import { getLottoPicks } from "../api/lotto-picks";
import { LOTTO_QUERY_KEY } from "../constants";
import { ILottoApiBody } from "../types/lotto-picks";

export const useLotteryDraws = (body: ILottoApiBody) => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [LOTTO_QUERY_KEY],
    queryFn: async () => {
      const { DrawResults, ErrorInfo } = await getLottoPicks(body);

      if (ErrorInfo) throw new Error(ErrorInfo);
      if (!Array.isArray(DrawResults) || !DrawResults.length) throw new Error('No data found')

      const { PrimaryNumbers, SecondaryNumbers } = DrawResults[0];
      return { PrimaryNumbers, SecondaryNumbers };
    },
    initialData: { PrimaryNumbers: [], SecondaryNumbers: [] },
    enabled: false,
  });

  return {
    data,
    isLoading,
    error,
    isError,
    refetch
  };
};


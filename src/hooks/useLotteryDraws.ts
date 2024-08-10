import { useQuery } from "@tanstack/react-query";
import { getLottoPicks } from "../api/lotto-picks";
import { LOTTO_QUERY_KEY } from "../constants";
import { ILottoApiBody } from "../types/lotto-picks";

export const useLotteryDraws = (body: ILottoApiBody) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [LOTTO_QUERY_KEY, body],
    queryFn: async () => {
      const { DrawResults, ErrorInfo, Success } = await getLottoPicks(body);

      if (ErrorInfo) throw new Error(ErrorInfo);
      if (Success === false || !Array.isArray(DrawResults) || !DrawResults.length) throw new Error('Unable to load data. Please wait a moment and try again')

      return DrawResults[0]
    },
    initialData: { PrimaryNumbers: [], SecondaryNumbers: [] },
    enabled: false,
  });

  return {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching
  };
};


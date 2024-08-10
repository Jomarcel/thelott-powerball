import { useQueryClient } from "@tanstack/react-query";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  COMPANY_ID,
  MAX_DRAW_COUNT_PER_PRODUCT,
  POWERBALL_HEADER,
  PRODUCT_FILTER,
  TOTAL_DRAWS,
  TOTAL_POWERBALL,
} from "../../constants";
import { useLotteryDraws } from "../../hooks";
import { generateNumbers } from "../../utils";
import {
  AutofillButton,
  DrawResults,
  ErrorMessage,
  LoadingIndicator,
  PickItem,
  TrashButton,
} from "../../components";
import { styles } from "./home.styles";
import { useEffect } from "react";

const initialDrawNumbers = generateNumbers(TOTAL_DRAWS);
const initialPowerBallNumbers = generateNumbers(TOTAL_POWERBALL);

export const HomeView = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, isError, refetch, isLoading } = useLotteryDraws({
    CompanyId: COMPANY_ID,
    MaxDrawCountPerProduct: MAX_DRAW_COUNT_PER_PRODUCT,
    OptionalProductFilter: [PRODUCT_FILTER],
  });

  const onAutoFillHandler = () => refetch();
  const onClearHandler = () => queryClient.resetQueries();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(<ErrorMessage error={error} />, {
        variant: "error",
      });
    }
  }, [isError, error, enqueueSnackbar]);

  return (
    <Container maxWidth="lg" sx={{ marginY: 2 }}>
      {/* Section displaying the total balls drawn, including the primary numbers and Powerball */}
      <Stack sx={styles.drawResultsContainer}>
        <DrawResults
          drawResults={data.PrimaryNumbers}
          powerBall={data.SecondaryNumbers}
        />
        <AutofillButton onClick={onAutoFillHandler} />
        <TrashButton onClick={onClearHandler} />
      </Stack>

      {isLoading && <LoadingIndicator />}

      {/* Section displaying draw numbers in the range of 1-35 */}
      <Box data-testid="draw-numbers-section" sx={styles.lottoGrid}>
        {initialDrawNumbers.map((number) => (
          <PickItem
            key={number}
            isPicked={data.PrimaryNumbers.includes(number)}
            item={number}
          />
        ))}
      </Box>

      {/* Section displaying Powerball numbers in the range of 1-20 */}
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.headerText}>{POWERBALL_HEADER}</Typography>
      </Box>
      <Box data-testid="powerball-numbers-section" sx={styles.lottoGrid}>
        {initialPowerBallNumbers.map((number) => (
          <PickItem
            key={number}
            isPicked={data.SecondaryNumbers.includes(number)}
            item={number}
          />
        ))}
      </Box>
    </Container>
  );
};

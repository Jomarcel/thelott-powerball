import { useQueryClient } from "@tanstack/react-query";
import { Box, Container, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
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

const initialDrawNumbers = generateNumbers(TOTAL_DRAWS);
const initialPowerBallNumbers = generateNumbers(TOTAL_POWERBALL);

export const HomeView = () => {
  const queryClient = useQueryClient();
  const {
    data: picks,
    error,
    isError,
    isLoading,
    refetch,
  } = useLotteryDraws({
    CompanyId: COMPANY_ID,
    MaxDrawCountPerProduct: MAX_DRAW_COUNT_PER_PRODUCT,
    OptionalProductFilter: [PRODUCT_FILTER],
  });

  const onClearHandler = () => queryClient.resetQueries();
  const onAutoFillHandler = () => refetch();

  if (isError) {
    return enqueueSnackbar(<ErrorMessage error={error} />, {
      variant: "error",
    });
  }

  return (
    <Container maxWidth="lg">
      {/* total balls drawn section */}
      <Stack sx={styles.drawResultsContainer}>
        {!isLoading && (
          <DrawResults
            drawResults={picks.PrimaryNumbers}
            powerBall={picks.SecondaryNumbers}
          />
        )}
        <AutofillButton onClick={onAutoFillHandler} />
        <TrashButton onClick={onClearHandler} />
      </Stack>

      {isLoading && <LoadingIndicator />}

      {/*Draws section showing a range of 1-35 */}
      <Box sx={styles.lottoGrid}>
        {initialDrawNumbers.map((number) => (
          <PickItem
            key={number}
            isPicked={picks.PrimaryNumbers.includes(number)}
            item={number}
          />
        ))}
      </Box>

      {/* Powerball section */}
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.headerText}>{POWERBALL_HEADER}</Typography>
      </Box>
      <Box sx={styles.lottoGrid}>
        {initialPowerBallNumbers.map((number) => (
          <PickItem
            key={number}
            isPicked={picks.SecondaryNumbers.includes(number)}
            item={number}
          />
        ))}
      </Box>
    </Container>
  );
};

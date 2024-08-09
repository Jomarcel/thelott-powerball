import { FC, useMemo } from "react";
import { ResultItem } from "./result-item";
import { Box } from "@mui/material";
import {
  INITIAL_DRAW_COUNT,
  POWER_BALL_LABEL,
} from "../../constants/lottery-config";
import { styles } from "./draw-results.styles";

const initialDraws: number[] = [...Array(INITIAL_DRAW_COUNT)];

interface IDrawResult {
  drawResults: number[];
  powerBall: number[];
}

const DrawResults: FC<IDrawResult> = ({ drawResults, powerBall }) => {
  const hasResults = drawResults.length > 0;
  const hasPowerBall = powerBall.length > 0;
  const results = useMemo(
    () => (hasResults ? drawResults : initialDraws),
    [drawResults, hasResults]
  );

  return (
    <Box sx={styles.container}>
      {/* Normal balls */}
      {results.map((item, index) => (
        <ResultItem key={index} item={item} />
      ))}
      {/* Porwerball */}
      <ResultItem
        item={hasPowerBall ? powerBall[0] : POWER_BALL_LABEL}
        isPowerball={hasPowerBall}
      />
    </Box>
  );
};

export default DrawResults;

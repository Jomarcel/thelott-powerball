import { Box, SxProps } from "@mui/material";
import { FC } from "react";
import cx from "classnames";

interface IProps {
  item: number | string;
  sx?: SxProps;
  isPowerball?: boolean;
}

export const ResultItem: FC<IProps> = ({ item, isPowerball = false }) => {
  const isNormalBall = typeof item === "number"; // Data fetched from api

  return (
    <Box
      className={cx("draw-item", {
        "normal-ball": isNormalBall,
        "power-ball": isPowerball,
      })}
    >
      {item}
    </Box>
  );
};

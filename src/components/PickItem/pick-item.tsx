import { FC } from "react";
import cx from "classnames";
import { Box } from "@mui/material";
import "./pick.item.css";

interface IProps {
  item: number;
  isPicked: boolean;
}

export const PickItem: FC<IProps> = ({ isPicked, item }) => {
  return (
    <Box className={cx("grid-item", { "is-picked": isPicked })}>{item}</Box>
  );
};

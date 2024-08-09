import { FC } from "react";
import { IconButton } from "@mui/material";
import { Delete, Bolt } from "@mui/icons-material";
import { IButton, IButtonWrapper } from "./types";
import { styles } from "./icon-buttons.styles";

// Base button component with predefined styles
const ButtonWrapper: FC<IButtonWrapper> = ({ onClick, sx, icon }) => {
  return (
    <IconButton
      edge="start"
      onClick={onClick}
      sx={{
        ...styles.buttonWrapper,
        ...sx,
      }}
    >
      {icon}
    </IconButton>
  );
};

export const TrashButton: FC<IButton> = ({ onClick }) => {
  return (
    <ButtonWrapper
      icon={<Delete />}
      onClick={onClick}
      sx={styles.trashButton}
    />
  );
};

export const AutofillButton: FC<IButton> = ({ onClick }) => {
  return (
    <ButtonWrapper
      icon={<Bolt />}
      onClick={onClick}
      sx={styles.autoFillButton}
    />
  );
};

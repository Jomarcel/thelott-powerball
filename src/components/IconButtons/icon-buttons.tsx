import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Bolt } from "@mui/icons-material";
import { IButton, IButtonWrapper } from "./types";
import { styles } from "./icon-buttons.styles";

// Base button component with predefined styles and additional customisation via the `sx`
const ButtonWrapper: FC<IButtonWrapper> = ({
  icon,
  onClick,
  sx,
  tooltipLabel,
}) => {
  return (
    <Tooltip arrow placement="top" title={tooltipLabel}>
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
    </Tooltip>
  );
};

export const TrashButton: FC<IButton> = ({ onClick }) => {
  return (
    <ButtonWrapper
      icon={<Delete />}
      onClick={onClick}
      sx={styles.trashButton}
      tooltipLabel="Clear"
    />
  );
};

export const AutofillButton: FC<IButton> = ({ onClick }) => {
  return (
    <ButtonWrapper
      icon={<Bolt />}
      onClick={onClick}
      sx={styles.autoFillButton}
      tooltipLabel="Autofill"
      data-testid="auto-fill-button"
    />
  );
};

import { SxProps } from "@mui/material";

export interface IButtonWrapper {
    icon: JSX.Element;
    onClick: () => void;
    sx?: SxProps;
    tooltipLabel: string;
}

export interface IButton {
    onClick: () => void;
}



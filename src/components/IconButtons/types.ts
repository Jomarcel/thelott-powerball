import { SxProps } from "@mui/material";

export interface IButtonWrapper {
    onClick: () => void;
    icon: JSX.Element;
    sx?: SxProps;
}

export interface IButton {
    onClick: () => void;
}



import { colors } from "../../constants";

export const styles = {
    buttonWrapper: {
        padding: "11px",
        color: colors.white,
    },
    autoFillButton: {
        marginRight: 2,
        color: colors.white,
        backgroundColor: colors.purple,
        "&:hover": {
            backgroundColor: colors.lightGrey,
        },
    },
    trashButton: {
        backgroundColor: colors.grey,
        "&:hover": {
            backgroundColor: colors.lightGrey,
        }
    }
}

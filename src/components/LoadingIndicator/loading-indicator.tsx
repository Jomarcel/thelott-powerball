import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const LoadingIndicator = () => {
  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <LinearProgress />
    </Box>
  );
};

import { Box, CircularProgress } from "@mui/material";

const Loader = ({ width, height }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: width || "100vh",
        width: height || "100%",
      }}
    >
      <CircularProgress sx={{ color: "#B9E018" }} />
    </Box>
  );
};

export default Loader;

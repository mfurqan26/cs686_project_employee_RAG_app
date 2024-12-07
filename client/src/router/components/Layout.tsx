import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Nav />
      <Box component="main" sx={{ flexGrow: 1, py: 3, px: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

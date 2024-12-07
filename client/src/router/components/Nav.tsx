import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PATHS } from "../paths";
import { theme } from "../../theme/theme";

export function Nav() {
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "right" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mr: 2, color: theme.palette.info.main }}
          >
            Employee RAG
          </Typography>
          <Box>
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to={PATHS.HOME}
              sx={{ mr: 2 }}
            >
              Home
            </Button>
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to={PATHS.BUSINESSES}
              sx={{ mr: 2 }}
            >
              Manage Businesses
            </Button>
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to={PATHS.SUGGESTIONS}
            >
              Suggestions
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

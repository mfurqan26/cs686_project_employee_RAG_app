import { Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PATHS } from "../router/paths";

function Home() {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Employee RAG
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to={PATHS.BUSINESSES}
          variant="contained"
          sx={{ mr: 2 }}
        >
          View Businesses
        </Button>
        <Button
          component={RouterLink}
          to={PATHS.SUGGESTIONS}
          variant="contained"
          sx={{ mr: 2 }}
        >
          View Suggestions
        </Button>
      </Box>
    </>
  );
}

export default Home;

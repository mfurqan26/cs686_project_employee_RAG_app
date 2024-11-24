import { useGetBusinessesQuery, Business } from "api-access";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  CircularProgress,
  Box,
} from "@mui/material";

function App() {
  const { loading, error, data } = useGetBusinessesQuery();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" textAlign="left">
        Businesses
      </Typography>
      <List>
        {data?.businesses.length ? (
          data?.businesses.map((business: Business) => (
            <ListItem key={business.id}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{business.name}</Typography>
                  <Typography>Industry: {business.industry}</Typography>
                  <Typography variant="body2">
                    Created: {new Date(business.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))
        ) : (
          <ListItem>No businesses found</ListItem>
        )}
      </List>
    </Container>
  );
}

export default App;

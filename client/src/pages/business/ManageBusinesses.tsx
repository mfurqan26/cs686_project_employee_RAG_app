import { useState } from "react";
import { useGetBusinessesQuery } from "api-access";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { BusinessForm } from "./BusinessForm";
import AddIcon from "@mui/icons-material/Add";

function ManageBusinesses() {
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h3" component="h1">
          Businesses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Business
        </Button>
      </Box>
      <List>
        {data?.businesses.length ? (
          data?.businesses.map((business) => (
            <ListItem key={business.id}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{business.name}</Typography>
                  <Typography variant="body2">
                    Created: {new Date(business.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Typography>No businesses found</Typography>
          </ListItem>
        )}
      </List>
      <BusinessForm open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}

export default ManageBusinesses;

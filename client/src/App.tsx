import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/apollo-client";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <h1>Hello World</h1>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

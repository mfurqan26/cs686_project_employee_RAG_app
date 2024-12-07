import { useState } from "react";
import { useGetBusinessesQuery } from "api-access";
import { Typography, CircularProgress, Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BusinessForm } from "./BusinessForm";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function ManageBusinesses() {
  const { loading, error, data } = useGetBusinessesQuery();
  const pageSize = 5;
  const pageSizeOptions = [5, 10, 25];
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Business Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
    },
    { field: "NAICSId", headerName: "NAICS ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => navigate(`/businesses/${params.row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

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
    return <Typography color="error">Error: {error.message}</Typography>;
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
          onClick={() => navigate("/businesses/create")}
        >
          Add Business
        </Button>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data?.businesses || []}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          initialState={{
            pagination: { paginationModel: { pageSize } },
          }}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": {
              color: "white",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "white",
            },
          }}
        />
      </Box>
    </>
  );
}

export default ManageBusinesses;

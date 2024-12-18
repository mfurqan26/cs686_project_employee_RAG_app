import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  usecreateBusinessMutation,
  usebusinessQuery,
  useupdateBusinessMutation,
  usedeleteBusinessMutation,
  usenaicsListQuery,
} from "api-access";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";

export function BusinessForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedNaics, setSelectedNaics] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data: naicsData } = usenaicsListQuery();
  const { data: businessData } = usebusinessQuery({
    variables: { id: id! },
    skip: !id,
  });

  const [createBusiness] = usecreateBusinessMutation({
    refetchQueries: ["businesses"],
  });

  const [updateBusiness] = useupdateBusinessMutation({
    refetchQueries: ["businesses"],
  });

  const [deleteBusiness] = usedeleteBusinessMutation({
    refetchQueries: ["businesses"],
  });

  useEffect(() => {
    if (businessData?.business) {
      setName(businessData.business.name);
      const naicsCode = businessData.business.NAICSId;
      if (naicsCode && naicsData?.naicsList) {
        const naicsMatch = naicsData.naicsList.find(
          (n) => n.code === naicsCode
        );
        if (naicsMatch) {
          setSelectedNaics(naicsMatch.code);
        }
      }
    }
  }, [businessData, naicsData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim()) {
      enqueueSnackbar("Business name is required", { variant: "error" });
      return;
    }

    if (!selectedNaics) {
      enqueueSnackbar("Please select a NAICS code", { variant: "error" });
      return;
    }

    try {
      const businessData = {
        name,
        naicsId: selectedNaics,
      };

      if (id) {
        await updateBusiness({
          variables: {
            data: { ...businessData, id },
          },
        });
        enqueueSnackbar(`${name} updated successfully`, { variant: "success" });
      } else {
        await createBusiness({
          variables: {
            data: businessData,
          },
        });
        enqueueSnackbar(`${name} created successfully`, { variant: "success" });
      }
      navigate("/businesses");
    } catch (error) {
      console.error(`Error saving ${name}:`, error);
      enqueueSnackbar(
        error instanceof Error ? error.message : "An error occurred",
        { variant: "error" }
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBusiness({
        variables: { id: id! },
      });
      enqueueSnackbar(`${name} deleted successfully`, {
        variant: "success",
      });
      navigate("/businesses");
    } catch (error) {
      console.error(`Error deleting ${name}:`, error);
      enqueueSnackbar(
        error instanceof Error ? error.message : "An error occurred",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{ mb: 4, display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography variant="h3">
          {id ? "Edit Business" : "Create Business"}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/businesses")}
        >
          Back
        </Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Autocomplete
            options={naicsData?.naicsList || []}
            getOptionLabel={(option) => `${option.code} - ${option.name}`}
            value={
              naicsData?.naicsList.find((n) => n.code === selectedNaics) || null
            }
            onChange={(_, newValue) => setSelectedNaics(newValue?.code ?? null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="NAICS Code"
                sx={{ mb: 3 }}
                required
              />
            )}
            isOptionEqualToValue={(option, value) => option.code === value.code}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {id && (
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" color="primary">
                {id ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default BusinessForm;

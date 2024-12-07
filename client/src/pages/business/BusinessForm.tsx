import { useState } from "react";
import { usecreateBusinessMutation } from "api-access";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface BusinessFormProps {
  open: boolean;
  onClose: () => void;
}

export function BusinessForm({ open, onClose }: BusinessFormProps) {
  const [name, setName] = useState("");
  const [createBusiness] = usecreateBusinessMutation({
    refetchQueries: ["GetBusinesses"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBusiness({
        variables: {
          data: {
            name,
          },
        },
      });
      setName("");
      onClose();
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Business</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ width: 400, mt: 2 }}>
            <TextField
              autoFocus
              label="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

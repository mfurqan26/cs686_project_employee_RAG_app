import { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  usebusinessesQuery,
  usebusinessQuery,
  usegenerateRunLLMMutation,
  usellmRecordsQuery,
  usebusinessEmployeesQuery,
  usenaicsQuery,
  GenerateType,
  LLMModelName,
  LLMRecord,
  RunStatus,
} from "api-access";
import { useSnackbar } from "notistack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface RoleType {
  jobTitle: string;
  responsibilities: string[];
  requiredSkills: string[];
  salaryRange: { min: number; max: number };
}

interface OutputContentType {
  roles: RoleType[];
  reasoning: string;
}

function Suggestions() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const { enqueueSnackbar } = useSnackbar();
  const { data: businessesData } = usebusinessesQuery();
  const { data: selectedBusiness, refetch: refetchBusiness } = usebusinessQuery(
    {
      variables: { id: selectedBusinessId ?? "" },
      skip: !selectedBusinessId,
    }
  );
  const { data: selectedNaics, refetch: refetchNaics } = usenaicsQuery({
    variables: { code: selectedBusiness?.business?.NAICSId ?? 0 },
  });

  const { data: selectedBusinessEmployees, refetch: refetchBusinessEmployees } =
    usebusinessEmployeesQuery({
      variables: { businessId: selectedBusinessId ?? "" },
    });

  const [generateLLM] = usegenerateRunLLMMutation({
    refetchQueries: ["llmRecords"],
  });

  const { data: llmRecords, refetch: refetchLlmRecords } = usellmRecordsQuery({
    variables: { businessId: selectedBusinessId ?? "" },
  });
  const [selectedLlmRecord, setSelectedLlmRecord] = useState<LLMRecord | null>(
    null
  );
  const [outputContent, setOutputContent] = useState<OutputContentType | null>(
    null
  );

  // Refetch  when business changes
  useEffect(() => {
    if (selectedBusinessId) {
      refetchLlmRecords({ businessId: selectedBusinessId });
      refetchBusiness({ id: selectedBusinessId });
    }
  }, [selectedBusinessId, refetchLlmRecords]);

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (selectedBusiness) {
      refetchNaics({ code: selectedBusiness?.business?.NAICSId ?? 0 });
    }
  }, [selectedBusiness, refetchNaics]);

  useEffect(() => {
    if (llmRecords?.llmRecords && llmRecords.llmRecords.length > 0) {
      const record = llmRecords.llmRecords[0];
      setSelectedLlmRecord(record);
      const content: OutputContentType = record.content
        ? JSON.parse(record.content)
        : null;
      setOutputContent(content);
    }
  }, [llmRecords]);

  useEffect(() => {
    if (!isGenerating || !selectedBusinessId) return;

    const interval = setInterval(async () => {
      const { data } = await refetchLlmRecords();
      const latestRecord = data?.llmRecords?.[0];

      if (
        latestRecord?.runStatus === RunStatus.SUCCESS ||
        latestRecord?.runStatus === RunStatus.FAIL
      ) {
        setIsGenerating(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, selectedBusinessId, refetchLlmRecords]);

  const handleGenerate = async () => {
    if (!selectedBusinessId) return;

    try {
      setIsGenerating(true);
      enqueueSnackbar("Generating suggestions...", { variant: "success" });
      const response = await generateLLM({
        variables: {
          data: {
            businessId: selectedBusinessId,
            generateType: GenerateType.EMPLOYEE_SUGGESTION,
            modelName: LLMModelName.GPT_4O_MINI,
            temperature: 0,
          },
        },
      });

      if (response.data?.generateRunLLM) {
        refetchLlmRecords({ businessId: selectedBusinessId });
        refetchBusinessEmployees({ businessId: selectedBusinessId });
      }
    } catch (error) {
      setIsGenerating(false);
      enqueueSnackbar("Error generating suggestions", { variant: "error" });
    }
  };

  const columns: GridColDef[] = [
    { field: "noc_code", headerName: "NOC Code", flex: 1 },
    {
      field: "nocTitle",
      headerName: "Job Title",
      flex: 2,
      renderCell: (params) => params.row?.NOC?.title ?? "",
    },
    {
      field: "wage_low",
      headerName: "Min Wage",
      flex: 1,
      renderCell: (params) => {
        if (params.value == null) return "";
        const value = params.value as number;
        return params.row.is_annual
          ? `$${value.toLocaleString()}/yr`
          : `$${value.toLocaleString()}/hr`;
      },
    },
    {
      field: "wage_median",
      headerName: "Median Wage",
      flex: 1,
      renderCell: (params) => {
        if (params.value == null) return "";
        const value = params.value as number;
        return params.row.is_annual
          ? `$${value.toLocaleString()}/yr`
          : `$${value.toLocaleString()}/hr`;
      },
    },
    {
      field: "wage_high",
      headerName: "Max Wage",
      flex: 1,
      renderCell: (params) => {
        if (params.value == null) return "";
        const value = params.value as number;
        return params.row.is_annual
          ? `$${value.toLocaleString()}/yr`
          : `$${value.toLocaleString()}/hr`;
      },
    },
    {
      field: "wage_average",
      headerName: "Average Wage",
      flex: 1,
      renderCell: (params) => {
        if (params.value == null) return "";
        const value = params.value as number;
        return params.row.is_annual
          ? `$${value.toLocaleString()}/yr`
          : `$${value.toLocaleString()}/hr`;
      },
    },
    { field: "data_source", headerName: "Data Source", flex: 1 },
    {
      field: "nocDefinition",
      headerName: "Job Description",
      flex: 2,
      renderCell: (params) => params.row?.NOC?.definition ?? "",
    },
  ];

  const renderContent = () => {
    return (
      <Box>
        {!selectedBusinessId ? null : isGenerating ||
          selectedLlmRecord?.runStatus === RunStatus.QUEUED ||
          selectedLlmRecord?.runStatus === RunStatus.RUNNING ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={20} />
            <Typography>Generating suggestions...</Typography>
          </Box>
        ) : !selectedLlmRecord || !llmRecords?.llmRecords?.length ? (
          <Typography>No Suggestions Yet</Typography>
        ) : selectedLlmRecord?.runStatus === RunStatus.FAIL ? (
          <Typography color="error">Failed to generate suggestions</Typography>
        ) : outputContent ? (
          <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={selectedBusinessEmployees?.businessEmployees ?? []}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
            />
          </Box>
        ) : (
          <Typography color="error">Error parsing suggestions</Typography>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Get Employee Suggestions
      </Typography>
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", width: "50%" }}
        >
          <Typography variant="h5">Business:</Typography>
          <FormControl fullWidth>
            <Select
              value={selectedBusinessId ?? ""}
              onChange={(e) => setSelectedBusinessId(e.target.value)}
            >
              {businessesData?.businesses.map((business) => (
                <MenuItem key={business.id} value={business.id}>
                  {business.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", width: "50%" }}
        >
          <Typography variant="h5">{`Industry: ${selectedNaics?.naics?.name}`}</Typography>
        </Box>
      </Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleGenerate}
        disabled={!selectedBusiness?.business?.id}
        sx={{ mt: 2 }}
      >
        Generate Suggestions
      </Button>

      <Box sx={{ mt: 4 }}>{renderContent()}</Box>
    </Box>
  );
}

export default Suggestions;

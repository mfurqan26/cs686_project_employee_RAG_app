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
  usegenerateRunLLMMutation,
  usellmRecordsQuery,
  GenerateType,
  LLMModelName,
  RunStatus,
} from "api-access";
import { useSnackbar } from "notistack";

interface RoleType {
  jobTitle: string;
  responsibilities: string[];
  requiredSkills: string[];
  salaryRange: { min: number; max: number };
}

function Suggestions() {
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [currentLLMRecordId, setCurrentLLMRecordId] = useState<string | null>(
    null
  );
  const { enqueueSnackbar } = useSnackbar();
  const { data: businessesData } = usebusinessesQuery();

  const [generateLLM] = usegenerateRunLLMMutation({
    refetchQueries: ["llmRecords"],
  });

  const { data: llmRecords, refetch } = usellmRecordsQuery({
    variables: { businessId: selectedBusinessId! },
    skip: !currentLLMRecordId,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isGenerating || !selectedBusinessId) return;

    const interval = setInterval(async () => {
      const { data } = await refetch();
      const latestRecord = data?.llmRecords?.[0];

      if (
        latestRecord?.runStatus === RunStatus.SUCCESS ||
        latestRecord?.runStatus === RunStatus.FAIL
      ) {
        setIsGenerating(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, selectedBusinessId, refetch]);

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
        setCurrentLLMRecordId(response.data.generateRunLLM.id);
      }
    } catch (error) {
      setIsGenerating(false);
      enqueueSnackbar("Error generating suggestions", { variant: "error" });
    }
  };

  const renderContent = () => {
    const record = llmRecords?.llmRecords?.[0];
    const content = record?.content ? JSON.parse(record.content) : null;

    return (
      <Box>
        {!selectedBusinessId ? null : isGenerating ||
          record?.runStatus === RunStatus.QUEUED ||
          record?.runStatus === RunStatus.RUNNING ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={20} />
            <Typography>Generating suggestions...</Typography>
          </Box>
        ) : !currentLLMRecordId || !llmRecords?.llmRecords?.length ? (
          <Typography>No Suggestions Yet</Typography>
        ) : record?.runStatus === RunStatus.FAIL ? (
          <Typography color="error">Failed to generate suggestions</Typography>
        ) : content ? (
          <>
            <Typography variant="h6" gutterBottom>
              Suggested Roles
            </Typography>
            {content.roles.map((role: RoleType, index: number) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">{role.jobTitle}</Typography>
                <Typography variant="subtitle1">Responsibilities:</Typography>
                <ul>
                  {role.responsibilities.map((resp: string, i: number) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
                <Typography variant="subtitle1">Required Skills:</Typography>
                <ul>
                  {role.requiredSkills.map((skill: string, i: number) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
                <Typography>
                  Salary Range: ${role.salaryRange.min.toLocaleString()} - $
                  {role.salaryRange.max.toLocaleString()}
                </Typography>
              </Paper>
            ))}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Reasoning: {content.reasoning}
            </Typography>
          </>
        ) : (
          <Typography color="error">Error parsing suggestions</Typography>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Get Employee Suggestions
      </Typography>
      <Box sx={{ maxWidth: 400, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Select Business</InputLabel>
          <Select
            value={selectedBusinessId}
            onChange={(e) => setSelectedBusinessId(e.target.value)}
          >
            {businessesData?.businesses.map((business) => (
              <MenuItem key={business.id} value={business.id}>
                {business.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          onClick={handleGenerate}
          disabled={!selectedBusinessId}
          sx={{ mt: 2 }}
        >
          Generate Suggestions
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>{renderContent()}</Box>
    </Box>
  );
}

export default Suggestions;

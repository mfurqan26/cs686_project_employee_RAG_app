import { z } from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';

const roleSchema = z.object({
  jobTitle: z.string().describe('The title of the job position'),
  responsibilities: z.array(z.string()).describe('List of key responsibilities for the role'),
  requiredSkills: z.array(z.string()).describe('List of required skills for the role'),
  salaryRange: z
    .object({
      min: z.number().describe('Minimum annual salary in USD'),
      max: z.number().describe('Maximum annual salary in USD'),
    })
    .describe('Expected salary range for the position'),
});

export function getEmployeeSuggestionOutputSchema() {
  return StructuredOutputParser.fromZodSchema(
    z.object({
      roles: z
        .array(roleSchema)
        .min(3)
        .max(5)
        .describe('List of 3-5 essential employee roles for the business'),
      reasoning: z
        .string()
        .describe('Brief explanation of why these roles are essential for this type of business'),
    }),
  );
}

export function getEmployeeSuggestionOutputSchemaForLevel() {
  return StructuredOutputParser.fromZodSchema(
    z.object({
      selectedNocCodes: z
        .array(z.string().describe(`NOC code selected for the business`))
        .describe(
          `List of NOCs (National Occupational Classification) codes for the business to hire`,
        ),
    }),
  );
}

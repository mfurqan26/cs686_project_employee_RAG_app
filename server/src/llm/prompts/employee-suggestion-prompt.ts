import { ChatPromptTemplate } from '@langchain/core/prompts';

export function getEmployeeSuggestionPrompt(): ChatPromptTemplate {
  return ChatPromptTemplate.fromTemplate(
    `You are an HR consultant. Generate employee role suggestions for the following business:
     Business Name: {businessName}
     Industry (NAICS): {industry}
     
     Provide 3-5 key employee roles that would be essential for this type of business.
     For each role include:
     1. Job title
     2. Key responsibilities
     3. Required skills
     4. Estimated salary range
     
     Format your response in a clear, structured way.
     {format_instructions}
    `,
  );
}

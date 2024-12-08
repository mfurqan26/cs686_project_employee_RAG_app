import { ChatPromptTemplate } from '@langchain/core/prompts';
import { NOC, NAICSDescriptor } from '@prisma/client';

export function getEmployeeSuggestionPrompt(): ChatPromptTemplate {
  return ChatPromptTemplate.fromTemplate(
    `You are an HR consultant with many years of professional experience. 
     Generate employee role suggestions for the following business:
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

export function getEmployeeSuggestionPromptForLevel(
  level: number,
  availableNocs: NOC[],
  businessName: string,
  industryName: string,
  descriptors: NAICSDescriptor[],
) {
  // Create level-specific prompt
  return ChatPromptTemplate.fromTemplate(
    `You are an HR consultant with many years of professional experience. 
    Pick NOCs (National Occupational Classification) codes that are the most relevant for hiring employees for the following business:
    Business Name: ${businessName}
    Business Industry: ${industryName}
    Business Industry Description: ${descriptors
      .map((descriptor) => `Category: ${descriptor.category}, Content: ${descriptor.content}`)
      .join('\n')}
    Available NOCs: ${availableNocs
      .map((noc) => `Code: ${noc.code}, Title: ${noc.title}, Definition: ${noc.definition}`)
      .join('\n')}
    Current Level: ${level}
    Note: If the current level is 5, then you are at the last level of selection, pick up to 10 or less most relevant NOCs total.

    Format Instructions: {format_instructions}
    `,
  );
}

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface FactCheckResult {
  isVerified: boolean;
  confidence: number;
  explanation: string;
  sources: string[];
  verdict: 'verified' | 'false' | 'misleading' | 'unverified';
}

export interface FactCheckRequest {
  content: string;
  type: 'url' | 'text' | 'document';
}

export class GeminiFactCheckService {
  static async factCheckContent(request: FactCheckRequest): Promise<FactCheckResult> {
    try {
      const prompt = `
        You are a fact-checking AI assistant. Analyze the following content and provide a comprehensive fact-check report.
        
        Content: ${request.content}
        Type: ${request.type}
        
        Please provide your analysis in the following JSON format:
        {
          "isVerified": boolean,
          "confidence": number (0-100),
          "explanation": "Detailed explanation of your findings",
          "sources": ["source1", "source2"],
          "verdict": "verified" | "false" | "misleading" | "unverified"
        }
        
        Guidelines:
        - Be thorough and objective in your analysis
        - Check for factual accuracy, bias, and misleading information
        - Provide confidence score based on available evidence
        - Include relevant sources when possible
        - Be clear about limitations and uncertainties
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            isVerified: parsed.isVerified || false,
            confidence: parsed.confidence || 0,
            explanation: parsed.explanation || 'Analysis completed',
            sources: parsed.sources || [],
            verdict: parsed.verdict || 'unverified'
          };
        }
      } catch (parseError) {
        console.warn('Failed to parse JSON response, using fallback');
      }
      
      // Fallback response
      return {
        isVerified: false,
        confidence: 50,
        explanation: text || 'Analysis completed but could not parse detailed results',
        sources: [],
        verdict: 'unverified'
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        isVerified: false,
        confidence: 0,
        explanation: 'Failed to analyze content due to API error',
        sources: [],
        verdict: 'unverified'
      };
    }
  }

  static async chatFactCheck(question: string): Promise<string> {
    try {
      const prompt = `
        You are a helpful fact-checking assistant for government schemes and policies. 
        Answer the following question with accurate, verified information about Indian government schemes, policies, and official procedures.
        
        Question: ${question}
        
        Guidelines:
        - Provide accurate information about government schemes
        - Include official sources when possible
        - Be clear about what is verified vs. what is general knowledge
        - If you're unsure about specific details, say so
        - Focus on helping citizens understand government benefits and procedures
        - Keep responses concise but informative
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini chat error:', error);
      return 'I apologize, but I encountered an error while processing your question. Please try again later.';
    }
  }
}

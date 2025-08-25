import AsyncStorage from "@react-native-async-storage/async-storage";

const GEMINI_API_KEY = "AIzaSyCyuGSIBpTjmwm9OonOGgWb4UsiI1aldu4";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Coffee shop dataset context
const DATASET_CONTEXT = `
You are an AI assistant for a coffee shop business audit app. You have access to the following transaction dataset:

The dataset contains coffee shop transactions with these columns:
- date: Transaction date (MM/DD/YYYY format)
- datetime: Time of transaction (HH:MM.S format)
- cash_type: Payment method ("cash" or "card")
- card: Card identifier (ANON-0000-0000-XXXX format for card payments, empty for cash)
- money: Transaction amount in currency units
- coffee_name: Name of the coffee/drink purchased

Sample data includes transactions from March 2024 to September 2024, with various coffee types like:
- Latte, Americano, Cappuccino, Hot Chocolate, Cocoa, Cortado, Espresso, Americano with Milk

The dataset contains over 3,600 transactions with varying prices and payment methods.

Your role is to:
1. Answer questions about the coffee shop's business performance
2. Provide insights on sales trends, popular items, payment methods
3. Help with audit-related queries about the business data
4. Give recommendations based on the transaction patterns
5. Calculate metrics like total revenue, average transaction value, etc.

Always base your answers on the dataset context provided. If asked about specific data not in the context, explain what you can analyze from the available information.
`;

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class GeminiService {
  private static instance: GeminiService;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests
  private readonly MAX_REQUESTS_PER_SESSION = 50; // Conservative limit

  private constructor() {}

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async testAPIKey(): Promise<{ success: boolean; message: string }> {
    try {
      const testPrompt =
        "Hello, please respond with 'API connection successful' if you can read this message.";
      const response = await this.makeRequest(testPrompt);

      if (response && response.candidates && response.candidates.length > 0) {
        return {
          success: true,
          message: "API key is valid and working correctly!",
        };
      } else {
        return {
          success: false,
          message: "API key test failed - no response received",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `API key test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  async chatWithDataset(userMessage: string): Promise<string> {
    try {
      // Rate limiting check
      const now = Date.now();
      if (now - this.lastRequestTime < this.RATE_LIMIT_DELAY) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.RATE_LIMIT_DELAY)
        );
      }

      // Request count check
      if (this.requestCount >= this.MAX_REQUESTS_PER_SESSION) {
        return "I've reached the maximum number of requests for this session to manage costs. Please try again later or contact support if you need more assistance.";
      }

      // Create the full prompt with context
      const fullPrompt = `${DATASET_CONTEXT}\n\nUser Question: ${userMessage}\n\nPlease provide a helpful response based on the coffee shop dataset context.`;

      const response = await this.makeRequest(fullPrompt);

      this.requestCount++;
      this.lastRequestTime = Date.now();

      if (response && response.candidates && response.candidates.length > 0) {
        return response.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I couldn't generate a response at the moment. Please try again.";
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `I encountered an error: ${
        error instanceof Error ? error.message : "Unknown error"
      }. Please try again.`;
    }
  }

  private async makeRequest(prompt: string): Promise<GeminiResponse> {
    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  getRequestCount(): number {
    return this.requestCount;
  }

  getRemainingRequests(): number {
    return Math.max(0, this.MAX_REQUESTS_PER_SESSION - this.requestCount);
  }

  resetSession(): void {
    this.requestCount = 0;
    this.lastRequestTime = 0;
  }
}

export default GeminiService;

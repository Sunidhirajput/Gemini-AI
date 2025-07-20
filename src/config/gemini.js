// Google Gemini API implementation
// Based on official documentation: https://ai.google.dev/tutorials/node_quickstart

import { GoogleGenerativeAI } from '@google/generative-ai';

// Function to get the AI client with proper error handling
function getAIClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set in environment variables. Please check your .env file.');
  }
  
  if (apiKey === 'AIzaSyACjk5By_z0RxmFlgnXnSsxlWvtkbjNQwE') {
    throw new Error('Please replace the default API key with your actual Gemini API key in the .env file.');
  }
  
  if (apiKey === 'your_actual_api_key_here') {
    throw new Error('Please replace "your_actual_api_key_here" with your actual Gemini API key in the .env file.');
  }
  
  return new GoogleGenerativeAI(apiKey);
}

// Available models with different free tier limits
const MODELS = [
  "gemini-1.5-flash",  // Best free tier limits
  "gemini-1.5-pro",    // Fallback option
  "gemini-1.0-pro"     // Alternative option
];

// Function to generate content using Gemini with model fallback
export async function generateContent(prompt, modelIndex = 0) {
  try {
    const genAI = getAIClient();
    const modelName = MODELS[modelIndex];
    console.log(`Trying model: ${modelName}`);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`Error with model ${MODELS[modelIndex]}:`, error);
    
    // Try next model if quota exceeded and we have more models to try
    if ((error.message.includes('quota') || error.message.includes('429')) && modelIndex < MODELS.length - 1) {
      console.log(`Quota exceeded for ${MODELS[modelIndex]}, trying next model...`);
      return generateContent(prompt, modelIndex + 1);
    }
    
    if (error.message.includes('quota') || error.message.includes('429')) {
      throw new Error('All free tier models have quota limits exceeded. Please wait a few minutes or upgrade to a paid plan.');
    }
    
    if (error.message.includes('API Key')) {
      throw new Error('Invalid or missing API key. Please check your .env file and ensure you have a valid Gemini API key.');
    }
    
    throw error;
  }
}

// Function to generate streaming content
export async function generateContentStream(prompt, onChunk) {
  try {
    const genAI = getAIClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContentStream(prompt);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error('Error generating streaming content:', error);
    
    if (error.message.includes('quota') || error.message.includes('429')) {
      throw new Error('Free tier quota exceeded. Please wait a few minutes or upgrade to a paid plan for higher limits.');
    }
    
    if (error.message.includes('API Key')) {
      throw new Error('Invalid or missing API key. Please check your .env file and ensure you have a valid Gemini API key.');
    }
    
    throw error;
  }
}
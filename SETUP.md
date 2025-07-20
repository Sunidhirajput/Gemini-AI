# Setup Guide - Getting Your Gemini API Key

## Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Update Your .env File

1. Open the `.env` file in your project root
2. Replace `your_actual_api_key_here` with your actual API key
3. Save the file

Example:
```env
VITE_GEMINI_API_KEY=AIzaSyB...your_actual_key_here
```

## Step 3: Restart Your Development Server

1. Stop your current dev server (Ctrl+C)
2. Run `npm run dev` again
3. The application should now work without errors

## Troubleshooting

- **"API Key must be set" error**: Make sure your .env file exists and contains the correct API key
- **"Invalid API key" error**: Double-check that you copied the entire API key correctly
- **Environment variable not loading**: Try restarting your development server

## Security Note

- Never share your API key publicly
- The .env file is already in .gitignore to prevent accidental commits
- Keep your API key secure and don't commit it to version control 
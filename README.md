# Gemini Clone

A React-based chat application that integrates with Google's Gemini AI API to provide intelligent conversational responses.

## Features

- 🤖 Real-time chat with Gemini AI
- 💬 Interactive message interface
- 🎨 Modern, responsive UI design
- 🔒 Secure API key management with environment variables
- ⚡ Fast and efficient message handling

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Gemini API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Get a Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start chatting with Gemini!

## Project Structure

```
gemini-clone/
├── src/
│   ├── components/
│   │   ├── ChatMessage/          # Chat message component
│   │   ├── Main/                 # Main chat interface
│   │   └── Sidebar/              # Sidebar component
│   ├── config/
│   │   └── gemini.js             # Gemini API configuration
│   ├── assets/                   # Images and icons
│   └── App.jsx                   # Main app component
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
└── package.json                  # Project dependencies
```

## Usage

1. **Start a conversation**: Type your message in the input field
2. **Send messages**: Click the "Send" button or press Enter
3. **View responses**: Gemini's responses will appear in the chat interface
4. **Suggested prompts**: Click on any of the suggestion cards to get started

## Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key (required)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already included in `.gitignore`
- API keys should be kept secure and not shared publicly

## Technologies Used

- React 19
- Vite
- Google Gemini AI API
- CSS3
- JavaScript ES6+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

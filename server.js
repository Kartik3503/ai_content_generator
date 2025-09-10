// // server.js

// const express = require('express');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors()); // You can restrict this later in production
// app.use(bodyParser.json());
// app.use(express.static('public')); // ✅ Serve static files from public/

// // API Key from .env
// const API_KEY = process.env.API_KEY;

// // External API URLs
// const TEXT_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
// const IMAGE_GEN_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;
// const TTS_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

// // Helper to call external API safely
// async function callExternalAPI(url, payload) {
//     const fullUrl = `${url}?key=${API_KEY}`;
//     const response = await fetch(fullUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });

//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`API error ${response.status}: ${text}`);
//     }

//     return response.json();
// }

// // Text generation endpoint
// app.post('/api/generate-text', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TEXT_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-text:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Image generation endpoint
// app.post('/api/generate-image', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(IMAGE_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-image:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Text-to-speech endpoint
// app.post('/api/generate-audio', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TTS_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-audio:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

























// // server.js

// const express = require('express');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors()); // You can restrict this later in production
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files from public/

// // API Key from .env
// const API_KEY = process.env.API_KEY;

// // External API URLs for different models
// const TEXT_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
// const TTS_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

// // **Corrected Image Generation API URL**
// // This model is specifically for text-to-image generation.
// const IMAGE_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict';

// // Helper to call external API safely
// async function callExternalAPI(url, payload) {
//     const fullUrl = `${url}?key=${API_KEY}`;
//     const response = await fetch(fullUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });

//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`API error ${response.status}: ${text}`);
//     }

//     return response.json();
// }

// // Text generation endpoint
// app.post('/api/generate-text', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TEXT_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-text:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // **Corrected Image generation endpoint for imagen-3.0**
// app.post('/api/generate-image', async (req, res) => {
//     try {
//         // Extract the prompt from the request body
//         const { prompt } = req.body;
//         // Construct the correct payload for the imagen-3.0 model
//         const payload = {
//             instances: [{ prompt: prompt }],
//             parameters: { sampleCount: 1 }
//         };
//         const data = await callExternalAPI(IMAGE_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-image:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Text-to-speech endpoint
// app.post('/api/generate-audio', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TTS_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-audio:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

































// // server.js

// const express = require('express');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors()); // You can restrict this later in production
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files from public/

// // API Key from .env
// const API_KEY = process.env.API_KEY;

// // External API URLs for different models
// const TEXT_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
// const TTS_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

// // **Corrected Image Generation API URL**
// // This model is specifically for text-to-image generation.
// const IMAGE_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
// // Helper to call external API safely
// async function callExternalAPI(url, payload) {
//     const fullUrl = `${url}?key=${API_KEY}`;
//     const response = await fetch(apiUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
// });

//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`API error ${response.status}: ${text}`);
//     }

//     return response.json();
// }

// // Text generation endpoint
// app.post('/api/generate-text', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TEXT_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-text:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // **Corrected Image generation endpoint for imagen-3.0**
// app.post('/api/generate-image', async (req, res) => {
//     try {
//         // Extract the prompt from the request body
//         const { prompt } = req.body;
//         // Construct the correct payload for the imagen-3.0 model
//         const payload = {
//             instances: [{ prompt: prompt }],
//             parameters: { sampleCount: 1 }
//         };
//         const data = await callExternalAPI(IMAGE_GEN_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-image:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Text-to-speech endpoint
// app.post('/api/generate-audio', async (req, res) => {
//     try {
//         const payload = req.body;
//         const data = await callExternalAPI(TTS_API_URL, payload);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in /api/generate-audio:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


































const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // You can restrict this later in production
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public/

// API Key from .env
const API_KEY = process.env.API_KEY;

// External API URLs
const TEXT_GEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
const IMAGE_GEN_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict`;
const TTS_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

// Helper to call external API safely
async function callExternalAPI(url, payload) {
    const fullUrl = `${url}?key=${API_KEY}`;
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error ${response.status}: ${text}`);
    }

    return response.json();
}

// Text generation endpoint
app.post('/api/generate-text', async (req, res) => {
    try {
        const payload = req.body;
        const data = await callExternalAPI(TEXT_GEN_API_URL, payload);
        res.json(data);
    } catch (error) {
        console.error('Error in /api/generate-text:', error);
        res.status(500).json({ error: error.message });
    }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        // The frontend sends a simple prompt, but the Imagen API needs a specific payload structure.
        // We reconstruct the payload here on the backend to match the API's requirements.
        const userPrompt = req.body.prompt;
        const payload = {
            instances: [{ prompt: userPrompt }],
            parameters: { sampleCount: 1 }
        };
        
        const data = await callExternalAPI(IMAGE_GEN_API_URL, payload);
        res.json(data);
    } catch (error) {
        console.error('Error in /api/generate-image:', error);
        res.status(500).json({ error: error.message });
    }
});

// Text-to-speech endpoint
app.post('/api/generate-audio', async (req, res) => {
    try {
        const payload = req.body;
        const data = await callExternalAPI(TTS_API_URL, payload);
        res.json(data);
    } catch (error) {
        console.error('Error in /api/generate-audio:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

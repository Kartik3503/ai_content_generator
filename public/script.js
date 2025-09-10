// script.js

// Select all necessary DOM elements
const inputSection = document.getElementById('input-section');
const loadingSection = document.getElementById('loading');
const resultSection = document.getElementById('result-section');
const imageSection = document.getElementById('image-section');
const imageLoadingSection = document.getElementById('image-loading');
const imageResultSection = document.getElementById('image-result');

const topicInput = document.getElementById('topic');
const lengthSelect = document.getElementById('length');
const toneSelect = document.getElementById('tone');
const generateBtn = document.getElementById('generate-btn');
const backBtn = document.getElementById('back-btn');
const copyBtn = document.getElementById('copy-btn');
const listenBtn = document.getElementById('listen-btn');
const generateImageBtn = document.getElementById('generate-image-btn');
const imagePromptInput = document.getElementById('image-prompt');
const generatedImage = document.getElementById('generated-image');
const resultTopic = document.getElementById('result-topic');
const resultContent = document.getElementById('result-content');
const copyMessage = document.getElementById('copy-message');

// Event listener for content generation button
generateBtn.addEventListener('click', generateContent);

// Event listener for "Start Over" button
backBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
});

// Event listener for "Copy to Clipboard" button
copyBtn.addEventListener('click', () => {
    const textToCopy = resultContent.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyMessage.classList.remove('hidden');
        setTimeout(() => copyMessage.classList.add('hidden'), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// Event listener for "Listen" button
listenBtn.addEventListener('click', generateAudio);

// Event listener for "Generate Image" button
generateImageBtn.addEventListener('click', generateImage);

// ... below the other event listeners, add this one ...


// Main function to handle text generation
async function generateContent() {
    const topic = topicInput.value.trim();
    if (!topic) {
        console.error('Please enter a topic.');
        return;
    }

    const length = lengthSelect.value;
    const tone = toneSelect.value;

    inputSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    const systemPrompt = `You are a helpful AI assistant for students. Write a ${length} answer about the topic. The tone should be ${tone}.`;
    const userQuery = `Topic: "${topic}"`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await fetch('/api/generate-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (content) {
            resultTopic.textContent = topic;
            resultContent.innerHTML = content.replace(/\n/g, '<br>');
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        } else {
            resultContent.textContent = "Could not generate content. Please try again.";
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error generating content:", error);
        resultContent.textContent = "An error occurred. Please try again.";
        loadingSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }
}

// Function to handle image generation.
// New and Corrected `generateImage` function
// Function to handle image generation
async function generateImage() {
    const prompt = imagePromptInput.value.trim();
    if (!prompt) {
        alert('Please enter a prompt to generate an image.');
        return;
    }

    imageSection.classList.add('hidden');
    imageLoadingSection.classList.remove('hidden');
    imageResultSection.classList.add('hidden');

    try {
        // Correct payload format for Gemini API multimodal generation
        const payload = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        // The image data is nested within the response
        const base64Data = data.candidates?.[0]?.content?.parts?.[0]?.image;

        if (base64Data) {
            generatedImage.src = `data:image/jpeg;base64,${base64Data}`;
            imageLoadingSection.classList.add('hidden');
            imageResultSection.classList.remove('hidden');
            imageSection.classList.remove('hidden');
        } else {
            alert('Could not generate image. Please try a different prompt.');
            imageLoadingSection.classList.add('hidden');
            imageSection.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please try again.');
        imageLoadingSection.classList.add('hidden');
        imageSection.classList.remove('hidden');
    }
}
// ... new function to download ...
function downloadContent() {
    const topic = resultTopic.textContent.trim();
    const content = resultContent.textContent;

    if (!content) {
        alert('No content to download. Please generate text first.');
        return;
    }

}

// Function to handle audio generation
async function generateAudio() {
    const textToSpeak = resultContent.textContent;
    if (!textToSpeak) {
        alert('No content to speak. Generate text first.');
        return;
    }

    // A simple visual indicator for loading state
    listenBtn.textContent = 'Loading...';
    listenBtn.disabled = true;

    try {
        const payload = {
            contents: [{ parts: [{ text: textToSpeak }] }]
        };

        const response = await fetch('/api/generate-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.audio;

        if (base64Audio) {
            const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
            audio.play();
        } else {
            console.error('No audio data received.');
            alert('Failed to generate audio. The text might be too long or the API is unavailable.');
        }
    } catch (error) {
        console.error('Error generating audio:', error);
        alert('An error occurred while generating audio. Please try again.');
    } finally {
        listenBtn.textContent = 'Listen ✨';
        listenBtn.disabled = false;
    }
}










// // script.js

// // Select all necessary DOM elements
// const inputSection = document.getElementById('input-section');
// const loadingSection = document.getElementById('loading');
// const resultSection = document.getElementById('result-section');
// const imageSection = document.getElementById('image-section');
// const imageLoadingSection = document.getElementById('image-loading');
// const imageResultSection = document.getElementById('image-result');

// const topicInput = document.getElementById('topic');
// const lengthSelect = document.getElementById('length');
// const toneSelect = document.getElementById('tone');
// const generateBtn = document.getElementById('generate-btn');
// const backBtn = document.getElementById('back-btn');
// const copyBtn = document.getElementById('copy-btn');
// const listenBtn = document.getElementById('listen-btn');
// const generateImageBtn = document.getElementById('generate-image-btn');
// const imagePromptInput = document.getElementById('image-prompt');
// const generatedImage = document.getElementById('generated-image');
// const resultTopic = document.getElementById('result-topic');
// const resultContent = document.getElementById('result-content');
// const copyMessage = document.getElementById('copy-message');

// // ✅ This line was missing. It must be here.
// const downloadBtn = document.getElementById('download-btn'); 

// // Event listeners
// generateBtn.addEventListener('click', generateContent);
// backBtn.addEventListener('click', () => {
//     resultSection.classList.add('hidden');
//     inputSection.classList.remove('hidden');
// });
// copyBtn.addEventListener('click', () => {
//     const textToCopy = resultContent.textContent;
//     navigator.clipboard.writeText(textToCopy).then(() => {
//         copyMessage.classList.remove('hidden');
//         setTimeout(() => copyMessage.classList.add('hidden'), 2000);
//     }).catch(err => {
//         console.error('Failed to copy text: ', err);
//     });
// });
// listenBtn.addEventListener('click', generateAudio);
// generateImageBtn.addEventListener('click', generateImage);
// downloadBtn.addEventListener('click', downloadContent);

// // Main function to handle text generation
// async function generateContent() {
//     const topic = topicInput.value.trim();
//     if (!topic) {
//         console.error('Please enter a topic.');
//         return;
//     }

//     const length = lengthSelect.value;
//     const tone = toneSelect.value;

//     inputSection.classList.add('hidden');
//     loadingSection.classList.remove('hidden');

//     const systemPrompt = `You are a helpful AI assistant for students. Write a ${length} answer about the topic. The tone should be ${tone}.`;
//     const userQuery = `Topic: "${topic}"`;

//     const payload = {
//         contents: [{ parts: [{ text: userQuery }] }],
//         systemInstruction: { parts: [{ text: systemPrompt }] }
//     };

//     try {
//         const response = await fetch('/api/generate-text', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });

//         const result = await response.json();
//         const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

//         if (content) {
//             resultTopic.textContent = topic;
//             resultContent.innerHTML = content.replace(/\n/g, '<br>');
//             loadingSection.classList.add('hidden');
//             resultSection.classList.remove('hidden');
//         } else {
//             resultContent.textContent = "Could not generate content. Please try again.";
//             loadingSection.classList.add('hidden');
//             resultSection.classList.remove('hidden');
//         }
//     } catch (error) {
//         console.error("Error generating content:", error);
//         resultContent.textContent = "An error occurred. Please try again.";
//         loadingSection.classList.add('hidden');
//         resultSection.classList.remove('hidden');
//     }
// }

// // Function to handle image generation
//  // Function to handle image generation
//         async function generateImage() {
//             const prompt = imagePromptInput.value.trim();
//             if (!prompt) {
//                 showMessage('Please enter a prompt to generate an image.');
//                 return;
//             }
            
//             // Hide the input form sections
//             inputSection.classList.add('hidden');
//             imageSection.classList.add('hidden');
            
//             // Show the loading screen
//             imageLoadingSection.classList.remove('hidden');
//             imageResultSection.classList.add('hidden');

//             try {
//                 const payload = { 
//                     instances: { prompt: prompt },
//                     parameters: { sampleCount: 1 }
//                 };
                
//                 const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;

//                 const response = await fetch(apiUrl, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });

//                 const data = await response.json();
//                 const base64Data = data.predictions?.[0]?.bytesBase64Encoded;

//                 if (base64Data) {
//                     generatedImage.src = `data:image/jpeg;base64,${base64Data}`;
//                     imageLoadingSection.classList.add('hidden');
//                     imageResultSection.classList.remove('hidden');
//                 } else {
//                     showMessage('Could not generate image. Please try a different prompt.');
//                     imageLoadingSection.classList.add('hidden');
//                     imageSection.classList.remove('hidden');
//                 }
//             } catch (error) {
//                 console.error('Error generating image:', error);
//                 showMessage('An error occurred while generating the image. Please try again.');
//                 imageLoadingSection.classList.add('hidden');
//                 imageSection.classList.remove('hidden');
//             }
//         }


// // Function to handle audio generation
//  async function generateAudio() {
//             const textToSpeak = resultContent.textContent;
//             if (!textToSpeak) {
//                 showMessage('No content to speak. Generate text first.');
//                 return;
//             }

//             listenBtn.textContent = 'Loading...';
//             listenBtn.disabled = true;

//             try {
//                 const payload = {
//                     contents: [{
//                         parts: [{ text: textToSpeak }]
//                     }],
//                     generationConfig: {
//                         responseModalities: ["AUDIO"],
//                         speechConfig: {
//                             voiceConfig: {
//                                 prebuiltVoiceConfig: { voiceName: "Puck" }
//                             }
//                         }
//                     },
//                     model: "gemini-2.5-flash-preview-tts"
//                 };

//                 const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

//                 const response = await fetch(apiUrl, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });

//                 const data = await response.json();
//                 const part = data.candidates?.[0]?.content?.parts?.[0];
//                 const audioData = part?.inlineData?.data;
//                 const mimeType = part?.inlineData?.mimeType;
                
//                 if (audioData && mimeType && mimeType.startsWith("audio/")) {
//                     const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
//                     const pcmData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
//                     const pcm16 = new Int16Array(pcmData.buffer);
//                     const wavBlob = pcmToWav(pcm16, sampleRate);
//                     const audioUrl = URL.createObjectURL(wavBlob);
//                     const audio = new Audio(audioUrl);
//                     audio.play();
//                 } else {
//                     console.error('No audio data received.');
//                     showMessage('Failed to generate audio. The text might be too long or the API is unavailable.');
//                 }
//             } catch (error) {
//                 console.error('Error generating audio:', error);
//                 showMessage('An error occurred while generating audio. Please try again.');
//             } finally {
//                 listenBtn.textContent = 'Listen ✨';
//                 listenBtn.disabled = false;
//             }
//         }

// // Function to download content
// function downloadContent() {
//     const topic = resultTopic.textContent.trim();
//     const content = resultContent.textContent;

//     if (!content) {
//         alert('No content to download. Please generate text first.');
//         return;
//     }

//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${topic}_generated_content.txt`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }














































  // // DOM element selections
  //       const inputSection = document.getElementById('input-section');
  //       const loadingSection = document.getElementById('loading');
  //       const resultSection = document.getElementById('result-section');
  //       const imageSection = document.getElementById('image-section');
  //       const imageLoadingSection = document.getElementById('image-loading');
  //       const imageResultSection = document.getElementById('image-result');

  //       const topicInput = document.getElementById('topic');
  //       const lengthSelect = document.getElementById('length');
  //       const toneSelect = document.getElementById('tone');
  //       const generateBtn = document.getElementById('generate-btn');
  //       const backBtn = document.getElementById('back-btn');
  //       const copyBtn = document.getElementById('copy-btn');
  //       const listenBtn = document.getElementById('listen-btn');
  //       const downloadBtn = document.getElementById('download-btn');
  //       const generateImageBtn = document.getElementById('generate-image-btn');
  //       const imagePromptInput = document.getElementById('image-prompt');
  //       const generatedImage = document.getElementById('generated-image');
  //       const resultTopic = document.getElementById('result-topic');
  //       const resultContent = document.getElementById('result-content');
  //       const copyMessage = document.getElementById('copy-message');
  //       const backToImageBtn = document.getElementById('back-to-image-prompt');
  //       const messageBox = document.getElementById('message-box');

  //       const apiKey = "";

  //       // Helper function to show messages
  //       function showMessage(message, duration = 3000) {
  //           messageBox.textContent = message;
  //           messageBox.style.display = 'block';
  //           setTimeout(() => {
  //               messageBox.style.display = 'none';
  //           }, duration);
  //       }

  //       // Helper function to convert base64 PCM to WAV
  //       function pcmToWav(pcm16, sampleRate) {
  //           const dataLength = pcm16.length * 2;
  //           const buffer = new ArrayBuffer(44 + dataLength);
  //           const view = new DataView(buffer);
  //           let offset = 0;

  //           function writeString(str) {
  //               for (let i = 0; i < str.length; i++) {
  //                   view.setUint8(offset++, str.charCodeAt(i));
  //               }
  //           }

  //           function writeUint32(val) {
  //               view.setUint32(offset, val, true);
  //               offset += 4;
  //           }

  //           function writeUint16(val) {
  //               view.setUint16(offset, val, true);
  //               offset += 2;
  //           }

  //           writeString('RIFF');
  //           writeUint32(36 + dataLength);
  //           writeString('WAVE');
  //           writeString('fmt ');
  //           writeUint32(16);
  //           writeUint16(1); // PCM format
  //           writeUint16(1); // Mono
  //           writeUint32(sampleRate);
  //           writeUint32(sampleRate * 2); // Byte rate
  //           writeUint16(2); // Block align
  //           writeUint16(16); // Bits per sample
  //           writeString('data');
  //           writeUint32(dataLength);

  //           const pcmView = new Int16Array(buffer, 44);
  //           pcmView.set(pcm16);

  //           return new Blob([view], { type: 'audio/wav' });
  //       }

  //       // Event listeners
  //       generateBtn.addEventListener('click', generateContent);
  //       backBtn.addEventListener('click', () => {
  //           resultSection.classList.add('hidden');
  //           inputSection.classList.remove('hidden');
  //       });
  //       copyBtn.addEventListener('click', () => {
  //           const textToCopy = resultContent.textContent;
  //           navigator.clipboard.writeText(textToCopy).then(() => {
  //               showMessage('Content copied to clipboard!');
  //           }).catch(err => {
  //               console.error('Failed to copy text: ', err);
  //               showMessage('Failed to copy text.');
  //           });
  //       });
  //       listenBtn.addEventListener('click', generateAudio);
  //       downloadBtn.addEventListener('click', downloadContent);
  //       generateImageBtn.addEventListener('click', generateImage);
  //       backToImageBtn.addEventListener('click', () => {
  //           imageResultSection.classList.add('hidden');
  //           imageSection.classList.remove('hidden');
  //       });

  //       // Main function to handle text generation
  //       async function generateContent() {
  //           const topic = topicInput.value.trim();
  //           if (!topic) {
  //               showMessage('Please enter a topic.');
  //               return;
  //           }

  //           const length = lengthSelect.value;
  //           const tone = toneSelect.value;

  //           inputSection.classList.add('hidden');
  //           loadingSection.classList.remove('hidden');

  //           const systemPrompt = `You are a helpful AI assistant for students. Write a ${length} answer about the topic. The tone should be ${tone}.`;
  //           const userQuery = `Topic: "${topic}"`;

  //           const payload = {
  //               contents: [{ parts: [{ text: userQuery }] }],
  //               systemInstruction: { parts: [{ text: systemPrompt }] }
  //           };
            
  //           const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  //           try {
  //               const response = await fetch(apiUrl, {
  //                   method: 'POST',
  //                   headers: { 'Content-Type': 'application/json' },
  //                   body: JSON.stringify(payload)
  //               });

  //               const result = await response.json();
  //               const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

  //               if (content) {
  //                   resultTopic.textContent = topic;
  //                   resultContent.innerHTML = content.replace(/\n/g, '<br>');
  //                   loadingSection.classList.add('hidden');
  //                   resultSection.classList.remove('hidden');
  //               } else {
  //                   resultContent.textContent = "Could not generate content. Please try again.";
  //                   loadingSection.classList.add('hidden');
  //                   resultSection.classList.remove('hidden');
  //               }
  //           } catch (error) {
  //               console.error("Error generating content:", error);
  //               resultContent.textContent = "An error occurred. Please try again.";
  //               loadingSection.classList.add('hidden');
  //               resultSection.classList.remove('hidden');
  //           }
  //       }

  //       // Function to handle image generation
  //       async function generateImage() {
  //           const prompt = imagePromptInput.value.trim();
  //           if (!prompt) {
  //               showMessage('Please enter a prompt to generate an image.');
  //               return;
  //           }
            
  //           // Hide the input form sections
  //           inputSection.classList.add('hidden');
  //           imageSection.classList.add('hidden');
            
  //           // Show the loading screen
  //           imageLoadingSection.classList.remove('hidden');
  //           imageResultSection.classList.add('hidden');

  //           try {
  //               const payload = { 
  //                   instances: { prompt: prompt },
  //                   parameters: { sampleCount: 1 }
  //               };
                
  //               const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

  //               const response = await fetch(apiUrl, {
  //                   method: 'POST',
  //                   headers: { 'Content-Type': 'application/json' },
  //                   body: JSON.stringify(payload)
  //               });

  //               const data = await response.json();
  //               const base64Data = data.predictions?.[0]?.bytesBase64Encoded;

  //               if (base64Data) {
  //                   generatedImage.src = `data:image/jpeg;base64,${base64Data}`;
  //                   imageLoadingSection.classList.add('hidden');
  //                   imageResultSection.classList.remove('hidden');
  //               } else {
  //                   showMessage('Could not generate image. Please try a different prompt.');
  //                   imageLoadingSection.classList.add('hidden');
  //                   imageSection.classList.remove('hidden');
  //               }
  //           } catch (error) {
  //               console.error('Error generating image:', error);
  //               showMessage('An error occurred while generating the image. Please try again.');
  //               imageLoadingSection.classList.add('hidden');
  //               imageSection.classList.remove('hidden');
  //           }
  //       }

  //       // Function to handle audio generation
  //       async function generateAudio() {
  //           const textToSpeak = resultContent.textContent;
  //           if (!textToSpeak) {
  //               showMessage('No content to speak. Generate text first.');
  //               return;
  //           }

  //           listenBtn.textContent = 'Loading...';
  //           listenBtn.disabled = true;

  //           try {
  //               const payload = {
  //                   contents: [{
  //                       parts: [{ text: textToSpeak }]
  //                   }],
  //                   generationConfig: {
  //                       responseModalities: ["AUDIO"],
  //                       speechConfig: {
  //                           voiceConfig: {
  //                               prebuiltVoiceConfig: { voiceName: "Puck" }
  //                           }
  //                       }
  //                   },
  //                   model: "gemini-2.5-flash-preview-tts"
  //               };

  //               const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

  //               const response = await fetch(apiUrl, {
  //                   method: 'POST',
  //                   headers: { 'Content-Type': 'application/json' },
  //                   body: JSON.stringify(payload)
  //               });

  //               const data = await response.json();
  //               const part = data.candidates?.[0]?.content?.parts?.[0];
  //               const audioData = part?.inlineData?.data;
  //               const mimeType = part?.inlineData?.mimeType;
                
  //               if (audioData && mimeType && mimeType.startsWith("audio/")) {
  //                   const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
  //                   const pcmData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
  //                   const pcm16 = new Int16Array(pcmData.buffer);
  //                   const wavBlob = pcmToWav(pcm16, sampleRate);
  //                   const audioUrl = URL.createObjectURL(wavBlob);
  //                   const audio = new Audio(audioUrl);
  //                   audio.play();
  //               } else {
  //                   console.error('No audio data received.');
  //                   showMessage('Failed to generate audio. The text might be too long or the API is unavailable.');
  //               }
  //           } catch (error) {
  //               console.error('Error generating audio:', error);
  //               showMessage('An error occurred while generating audio. Please try again.');
  //           } finally {
  //               listenBtn.textContent = 'Listen ✨';
  //               listenBtn.disabled = false;
  //           }
  //       }

  //       // Function to download content
  //       function downloadContent() {
  //           const topic = resultTopic.textContent.trim();
  //           const content = resultContent.textContent;

  //           if (!content) {
  //               showMessage('No content to download. Please generate text first.');
  //               return;
  //           }

  //           const blob = new Blob([content], { type: 'text/plain' });
  //           const url = URL.createObjectURL(blob);
  //           const a = document.createElement('a');
  //           a.href = url;
  //           a.download = `${topic}_generated_content.txt`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  //           document.body.appendChild(a);
  //           a.click();
  //           document.body.removeChild(a);
  //           URL.revokeObjectURL(url);
  //       }
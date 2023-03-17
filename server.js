const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "***",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;
  
  // Generate a response with ChatGPT
  try {
        let responseArray = "";

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0,
            stream: true,
        }, { responseType: 'stream' });
        
        response.data.on('data', (data) => {
            let para = "";
            const lines = data.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                if (message === '[DONE]') {
                    return responseArray; // Stream finished
                }
                try {
                    const parsed = JSON.parse(message);
                    para+=parsed.choices[0].text;
                } catch(error) {
                    console.error('Could not JSON parse stream message', message, error);
                }
            }
            responseArray+=para;
        });

        response.data.on('close', () => {
            console.log("response Array : ", responseArray);
            res.send(responseArray);
        })

        
    } catch (error) {
        if (error.response?.status) {
            console.error(error.response.status, error.message);
            error.response.data.on('data', data => {
                const message = data.toString();
                try {
                    const parsed = JSON.parse(message);
                    console.error('An error occurred during OpenAI request: ', parsed);
                } catch(error) {
                    console.error('An error occurred during OpenAI request: ', message);
                }
            });
        } else {
            console.error('An error occurred during OpenAI request', error);
        }
    }

    
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
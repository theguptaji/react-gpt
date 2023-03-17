# react-gpt
A UI layer on top of GPT4 API, which prettifies its mathematical response

## Prerequisites
Please add your OPENAI keys in `server.js` before running the server.
# How to test

## Run the server
```shell
cd react-gpt
npm run start
```

## Send command to server
```shell
curl -X POST -H "Content-Type: application/json" -d '{"prompt":"solve x^3+px+q=0"}' http://localhost:8080/chat
```
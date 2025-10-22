# Async Weather & News App

- A simple Node.js + TypeScript project that demonstrates asynchronous programming in three different styles:
Callbacks, Promises, and Async/Await — using real-world API data (weather + news).

## Project Overview

### This project fetches:

- Weather data from Open-Meteo API

- News headlines from DummyJSON Posts API

### It shows how asynchronous code can be written using:

- Callbacks

- Promises

- Async/Await

### You’ll also see:

- Promise.all() — running multiple requests in parallel

- Promise.race() — handling whichever request responds first

## Setup Instructions
1. Create and set up the project
``` bash
mkdir async-weather-news
cd async-weather-news
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

2. Folder structure

Create a src/ folder and add the three .ts files above.

3. Add build scripts in package.json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts"
}

## Running the Project

### Choose a version to run:

1.  Callback version:
``` bash 
npx ts-node src/callbackVersion.ts
``` 

2.  Promise version
``` bash 
 npx ts-node src/promiseVersion.ts
``` 
3.  Async/Await version
``` bash 
npx ts-node src/asyncAwait.ts
``` 

## What You’ll Learn
- Concept	Description
- Callbacks	Traditional asynchronous pattern using nested callbacks and the event loop
- Promises	Cleaner, chainable async logic using .then() and .catch()
- Async/Await	Most modern async syntax with try...catch error handling
- Promise.all()	Run multiple requests simultaneously
- Promise.race()	Handle whichever response returns first

## APIs Used
### API	URL	Purpose
- Open-Meteo	- https://api.open-meteo.com/v1/forecast?latitude=-33.92&longitude=18.42&current_weather=true	(Current weather for Cape Town)
- DummyJSON	- https://dummyjson.com/posts	(Mock posts used as news headlines)

## Technologies Used

* Node.js

* TypeScript

* HTTPS Module (built-in)

* ts-node (for running TypeScript directly)

## Example Output (Callback Hell)
<img src="./src/images/Screenshot 2025-10-22 091007.png">

## Example Output (Promise)
<img src="./src/images/Screenshot 2025-10-22 090755.png">

## Example Output (Async/Await)
<img src="./src/images/Screenshot 2025-10-22 090455.png">

## Conclusion

This project demonstrates the evolution of asynchronous programming in JavaScript — from callback hell 😵‍💫 to elegant async/await 🎉.
It’s a great reference for understanding how Node.js handles asynchronous tasks in the event loop.
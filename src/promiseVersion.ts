import { get } from 'http';
import https from 'https';

function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
        })
        .on("error", (err) => reject(err));
    })
} 

const weatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=-33.92&longitude=18.42&current_weather=true";
const newsUrl = "https://dummyjson.com/posts";

async function getWeatherThenNews() {
    console.log("Fetching weather data...");

    fetchData(weatherUrl)
    .then((weatherData) => {
        console.log("Weather fetched successfully");
        console.log("---current Weather---");
        console.log(weatherData.current_weather);

        console.log("Fetching news data...");
        return fetchData(newsUrl);
    })
    .then((newsData) => {
        console.log("News fetched successfully");
        console.log("---article---");
        newsData.posts.slice(0, 5).forEach((post: any, i: number) =>{
            console.log(`${i + 1}. ${post.title}`);
        });
    })
    .catch((err) => {
        console.error("Error", err);
    })
}

function getWeatherAndNews() {
    console.log("Running promise.all()..."); 
    Promise.all([fetchData(weatherUrl), fetchData(newsUrl)])
    .then(([weatherData, newsData]) => {
        console.log("Both fetched successfully");
        console.log("---current Weather---");
        console.log("Current Weather:", weatherData.current_weather);
        console.log("---article---");
        newsData.posts.slice(0, 3).forEach((post: any, i: number) =>{
            console.log(`${i + 1}. ${post.title}`);
        });
    })
    .catch((err) => {
        console.error("Error in promise.all():", err);
    })
}

function getFastestResponse() {
    console.log("Running promise.race()...");
    Promise.race([fetchData(weatherUrl), fetchData(newsUrl)])
    .then((fastestData) => {
        console.log("Fastest data received!!");
        
        if (fastestData.current_weather) {
            console.log("It is weather data:", fastestData.current_weather);
        } else {
            console.log("It is news data:");
            console.log(fastestData.posts.slice(0, 2).map((p: any) => p.title));
        }
    })
    .catch((err) => {
        console.error("Error in promise.race():", err);
    });
}

getWeatherThenNews();
getWeatherAndNews();
getFastestResponse();
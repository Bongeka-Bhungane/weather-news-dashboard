import https from "https";

function fetchData(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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
  });
}

const weatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=-33.92&longitude=18.42&current_weather=true";
const newsUrl = "https://dummyjson.com/posts";

async function getWeatherAndNews() {
  try {
    console.log("Fetching weather data...");
    const weatherData = await fetchData(weatherUrl);
    console.log("Weather fetched successfully");
    console.log("---current Weather---");
    console.log(weatherData.current_weather);

    console.log("Fetching news data...");
    const newsData = await fetchData(newsUrl);
    console.log("News fetched successfully");
    console.log("---article---");
    newsData.posts.slice(0, 5).forEach((post: any, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
    });
  } catch (error) {
    console.error("Error", error);
  }
}

async function getWeatherAndNewsTogether() {
  try {
    console.log("fetching weather data and news data together...");
    const [weatherData, newsData] = await Promise.all([
      fetchData(weatherUrl),
      fetchData(newsUrl),
    ]);

    console.log("Both fetched successfully");
    console.log("---current Weather---");
    console.log("Current Weather:", weatherData.current_weather);
    console.log("---article---");
    newsData.posts.slice(0, 3).forEach((post: any, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
    });
  } catch (error) {
    {
      console.error("Error in Promise.all():", error);
    }
  }
}

async function getFastestResponse() {
    try {   
        console.log("Fetching fastest response between weather data and news data...");
        const fastestData = await Promise.race([fetchData(weatherUrl), fetchData(newsUrl)]);

        console.log("Fastest data received!!");
        if (fastestData.current_weather) {
            console.log("---current Weather---");
            console.log("Current Weather:", fastestData.current_weather);
        } else {
            console.log("---article---");
            console.log(fastestData.posts.slice(0, 5).map((p: any) => p.title));

        }
    } catch (error) {
        console.error("Error in Promise.race():", error);
    }
}

(async () => {
    await getWeatherAndNews();
    await getWeatherAndNewsTogether();
    await getFastestResponse();
})();
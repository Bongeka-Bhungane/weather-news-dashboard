import https from 'https';

function fetchData(url: string, callback: (err: Error | null, data?: any) => void): void {
  https.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
      } catch (error) {
        callback(error as Error);
      }
    })
  })
  .on("error", (err) => {
    callback(err);
  })
}

function getWeatherAndNews() {
  const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=-33.92&longitude=18.42&current_weather=true";
  const newsUrl = "https://dummyjson.com/posts";

  console.log("Fetching weather data...");

  fetchData(weatherUrl, (weatherErr, weatherData) => {
    if (weatherErr) {
      console.error("Error fetching weather data:", weatherErr);
      return;
    }
    console.log("Weather fetched sucessfully");

    console.log("Fetching news data...");
    fetchData(newsUrl, (newsErr, newsData) => {
      if (newsErr) {
        console.error("Error fetching news data:", newsErr);
        return;
      }

      console.log("News fetched successfully");
      console.log("---current Weather---");
      console.log("Current Weather:", weatherData.current_weather);

      console.log("---article---");
      newsData.posts.slice(0, 5).forEach((post: any, i: number) =>{
        console.log(`${i + 1}. ${post.title}`);
      });

      console.log("Fetching another set of data to show callback hell...");

      fetchData(newsUrl, (extraErr, extraData) => {
        if (extraErr) {
          console.error("Error fetching extra news data:", extraErr);
          return;
        }
        console.log("Extra News fetched: callback done successfully");
      })
    })
  })
}

getWeatherAndNews();
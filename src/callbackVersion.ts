import https from "https";

// Function to fetch data using a callback
function fetchData(
  url: string,
  callback: (err: Error | null, data?: any) => void
) {
  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          callback(null, parsed);
        } catch (error) {
          callback(error as Error);
        }
      });
    })
    .on("error", (err) => {
      callback(err);
    });
}

// Demonstrating callback hell by nesting dependent calls
function getWeatherAndNews() {
  const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=-33.92&longitude=18.42&current_weather=true";
  const newsUrl = "https://dummyjson.com/posts";

  console.log("Fetching weather data...");

  fetchData(weatherUrl, (weatherErr, weatherData) => {
    if (weatherErr) {
      console.error("Error fetching weather:", weatherErr);
      return;
    }
    console.log("Weather fetched successfully!");

    // Nested callback (callback hell)
    console.log("Fetching news data...");

    fetchData(newsUrl, (newsErr, newsData) => {
      if (newsErr) {
        console.error("Error fetching news:", newsErr);
        return;
      }

      console.log("News fetched successfully!");
      console.log("\n=== Weather Data ===");
      console.log(weatherData.current_weather);

      console.log("\n=== News Headlines ===");
      newsData.posts.slice(0, 5).forEach((post: any, i: number) => {
        console.log(`${i + 1}. ${post.title}`);
      });

      // Another nested call to exaggerate callback hell
      console.log(
        "\nFetching another set of data just to show callback hell..."
      );

      fetchData(newsUrl, (extraErr, extraData) => {
        if (extraErr) {
          console.error("Error fetching extra data:", extraErr);
          return;
        }

        console.log(
          "Extra data fetched successfully! Done with callback hell "
        );
      });
    });
  });
}

// Run it
getWeatherAndNews();

import http from "node:http";

const PORT = 3000;
const app = http.createServer((req, res) => {
  const authHeader = req.headers["authorization"];

  res.setHeader("Content-Type", "text/plain");

  if (authHeader) {
    res.statusCode = 200;
    res.end("Authorization header received");
  } else {
    res.statusCode = 401;
    res.end("Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});

(async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}`, {
      headers: {
        Authorization: "Bearer myToken",
      },
    });

    const text = await response.text();

    console.log("Server response:", text);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
})();

import http from "node:http";

const PORT = 3000;
const app = http.createServer((req, res) => {
  switch (req.method) {
    case "PUT":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("PUT request processed");
      break;
    case "DELETE":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("DELETE request processed");
      break;
    default:
      res.statusCode = 405; // Method Not Allowed
      res.setHeader("Content-Type", "text/plain");
      res.end(`The ${req.method} method is not supported`);
  }
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});

async function createReq(method = "GET") {
  try {
    const response = await fetch(`http://localhost:${PORT}`, { method });
    const text = await response.text();
    console.log("Server response:", text);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

(() => {
  createReq("PUT");
  createReq("DELETE");
  createReq();
})();

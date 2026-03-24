const http = require("http");
const fs = require("fs");
const path = require("path");

// Helper function to serve files
const serveFile = (res, filePath, contentType, statusCode = 200) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Serve 404 if error
      fs.readFile(path.join(__dirname, "pages", "404.html"), (err, data) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

// Create server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Routing
  if (url === "/home") {
    serveFile(res, path.join(__dirname, "pages", "home.html"), "text/html");
  } 
  else if (url === "/about") {
    serveFile(res, path.join(__dirname, "pages", "about.html"), "text/html");
  } 
  else if (url === "/contact") {
    serveFile(res, path.join(__dirname, "pages", "contact.html"), "text/html");
  } 
  else if (url === "/style.css") {
    serveFile(res, path.join(__dirname, "public", "style.css"), "text/css");
  } 
  else {
    serveFile(res, path.join(__dirname, "pages", "404.html"), "text/html", 404);
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
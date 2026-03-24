const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const url = req.url;

  const serveFile = (filePath, contentType, statusCode = 200) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(process.cwd(), "pages", "404.html"), (err, data) => {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        });
      } else {
        res.statusCode = statusCode;
        res.setHeader("Content-Type", contentType);
        res.end(data);
      }
    });
  };

  if (url === "/home") {
    serveFile(path.join(process.cwd(), "pages", "home.html"), "text/html");
  } 
  else if (url === "/about") {
    serveFile(path.join(process.cwd(), "pages", "about.html"), "text/html");
  } 
  else if (url === "/contact") {
    serveFile(path.join(process.cwd(), "pages", "contact.html"), "text/html");
  } 
  else if (url === "/style.css") {
    serveFile(path.join(process.cwd(), "public", "style.css"), "text/css");
  } 
  else {
    serveFile(path.join(process.cwd(), "pages", "404.html"), "text/html", 404);
  }
};
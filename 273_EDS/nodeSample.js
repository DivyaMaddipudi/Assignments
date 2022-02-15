var http = require("http");
var dt = require("./myModule");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("The date and time are currently: " + dt.myDateTime());
    res.end();
  })
  .listen(8080, () => {
    console.log("server is running");
  });

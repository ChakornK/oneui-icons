import fs from "node:fs";

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>One UI Icons</title>
  <style>
    body {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0;
      padding: 0.5rem;
      width: 100%;
      height: 100vh;
      overflow-x: hidden;
    }
    img {
      background: #ddd;
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: 2rem;
      height: 2rem;
    }
  </style>
</head>
<body>`;
for (const file of fs.readdirSync("./icons")) {
  if (file.endsWith(".svg")) {
    html += `<img src="./icons/${file}">`;
  }
}
html += `</body></html>`;
fs.writeFileSync("./gallery.html", html);

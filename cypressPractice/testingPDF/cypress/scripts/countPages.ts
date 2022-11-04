const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

export const countPages = (pathToPdf: string) => {
  return new Promise((resolve) => {
    const resolvedPath = path.resolve(pathToPdf);
    let dataBuffer = fs.readFileSync(resolvedPath);

    pdf(dataBuffer).then(function ({ numrender }) {
      resolve(numrender);
    });
  });
};

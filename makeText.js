const fs = require("fs");
const process = require("process");
const markov = require("./markov");
const axios = require("axios");

let inputText = "";

if (process.argv[2] === "file") {
  fs.readFile(process.argv[3], "utf8", function (err, data) {
    if (err) {
      console.error("File could not be read.");
      process.exit();
    }
    let mm = new markov.MarkovMachine(data);
    console.log(mm.makeText());
  });
} else if (process.argv[2] === "url") {
  let res = axios
    .get(process.argv[3])
    .then((res) => res.data)
    .then((res) => {
      let mm = new markov.MarkovMachine(res);
      console.log(mm.makeText());
    })
    .catch((error) => console.error("Url could not be read."));
} else {
  console.error("Need to define and provide a text file or url.");
  process.exit();
}
// }

// function handleOutput(text, out) {
//   if (out) {
//     fs.writeFile(out, text, "utf8", function (err) {
//       if (err) {
//         console.error(`Couldn't write ${out}: ${err}`);
//         process.exit(1);
//       } else {
//         console.log(`Contents of ${path} have been written to ${out}`);
//       }
//     });
//   } else {
//     console.log(text);
//   }
// }

// function cat(path, out) {
//   fs.readFile(path, "utf8", function (err, data) {
//     if (err) {
//       console.error(`Error reading ${path}: ${err}`);
//       process.exit(1);
//     } else {
//       handleOutput(data, out);
//     }
//   });
// }

// async function webCat(path, out) {
//   try {
//     const res = await axios.get(path);
//     handleOutput(res.data, out);
//   } catch (error) {
//     console.error(`Error fetching: ${path}: ${error}`);
//     process.exit(1);
//   }
// }

// let path;
// let out;

// if (process.argv[2] === "--out") {
//   out = process.argv[3];
//   path = process.argv[4];
// } else {
//   path = process.argv[2];
// }

// if (path.slice(0, 4) === "http") {
//   webCat(path, out);
// } else {
//   cat(path, out);

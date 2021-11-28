const express = require("express");
const cors = require("cors");
const audio = require("win-audio").speaker;
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "http://192.168.31.253:3000" }));

function success(res, params) {
  res.send({
    ...params,
    message: "ok",
    code: 200,
  });
}

function error(res, error) {
  res.send({
    error,
    message: "error",
    code: 500,
  });
}

app.get("/get-volume", (req, res) => {
  try {
    success(res, {
      volume: audio.get(),
    });
  } catch (err) {
    error(res);
  }
});

app.post("/set-volume", (req, res) => {
  const host = req.get("host");
  const origin = req.get("origin");
  console.log(host, "host");
  console.log(origin, "origin");
  const volume = req.body.volume;
  try {
    audio.set(volume);
    success(res);
  } catch (err) {
    error(res, err);
  }
});

app.post("/shutdown", (req, res) => {
  exec("shutdown /s /t 0", (_error, stdout, stderr) => {
    if (_error) {
      return error(res, _error);
    }
    if (stderr) {
      return error(res, stderr);
    }
    console.log(stdout, "1");
    return success(res);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

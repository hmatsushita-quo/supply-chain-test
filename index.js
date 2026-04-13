const express = require("express");
const _ = require("lodash");
const minimist = require("minimist");
const axios = require("axios");
const fetch = require("node-fetch");
const tar = require("tar");
const shell = require("shelljs");
const marked = require("marked");
const qs = require("qs");
const semver = require("semver");
const jwt = require("jsonwebtoken");
const JSON5 = require("json5");

const app = express();
app.use(express.json());

// lodash - Prototype Pollution (CVE-2021-23337)
app.post("/api/merge", (req, res) => {
  const base = { name: "default" };
  const result = _.merge(base, req.body);
  res.json(result);
});

// marked - XSS / ReDoS (CVE-2022-21680, CVE-2022-21681)
app.post("/api/render-markdown", (req, res) => {
  const html = marked(req.body.markdown || "");
  res.send(html);
});

// qs - Prototype Pollution (CVE-2022-24999)
app.get("/api/parse-query", (req, res) => {
  const parsed = qs.parse(req.query.input);
  res.json(parsed);
});

// jsonwebtoken - Insecure default (CVE-2022-23529)
app.post("/api/verify-token", (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, "secret-key");
    res.json({ valid: true, decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
});

// json5 - Prototype Pollution (CVE-2022-46175)
app.post("/api/parse-json5", (req, res) => {
  const parsed = JSON5.parse(req.body.data || "{}");
  res.json(parsed);
});

// axios - SSRF (CVE-2021-3749)
app.get("/api/fetch-url", async (req, res) => {
  try {
    const response = await axios.get(req.query.url);
    res.json({ data: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// node-fetch - Redirect bypass (CVE-2022-0235)
app.get("/api/fetch-v2", async (req, res) => {
  try {
    const response = await fetch(req.query.url);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// semver - ReDoS (CVE-2022-25883)
app.get("/api/check-version", (req, res) => {
  const valid = semver.valid(req.query.version);
  res.json({ version: req.query.version, valid: !!valid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vulnerability sample server running on port ${PORT}`);
});
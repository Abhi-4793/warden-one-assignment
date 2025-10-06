import "dotenv/config";
import express from "express";

const cors = require("cors");
import { getProperties } from "./use-cases/getProperties";

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.get("/", (_req, res) => res.send("Warden Weather Test: OK"));
app.get(`/get-properties`, getProperties);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));

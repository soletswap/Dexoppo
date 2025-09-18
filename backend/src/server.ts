import express from "express";
import cors from "cors";
import pairsRoute from "./routes/pairs";
import { startJobs } from "./jobs/schedule";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/pairs", pairsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Backend listening on " + port);
  startJobs();
});

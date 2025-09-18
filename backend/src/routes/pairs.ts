import { Router } from "express";
import { listPairs, getPair } from "../services/pairService";

const router = Router();

router.get("/", (req, res) => {
  const search = req.query.search?.toString();
  const timeFilter = req.query.timeFilter?.toString();
  res.json({ data: listPairs(search, timeFilter) });
});

router.get("/:id", (req, res) => {
  const p = getPair(req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

export default router;

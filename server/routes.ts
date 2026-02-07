import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API Routes are placeholders as this is a frontend-only demo
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "frontend-only" });
  });

  return httpServer;
}

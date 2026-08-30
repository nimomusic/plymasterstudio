import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ==================================================================================
// 📁 간단한 서버 DB 파일 기반 카운터 저장소 (data/counts.json)
// ==================================================================================
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "counts.json");

interface StatsDB {
  visitCount: number;
  trackPlayCounts: Record<string, number>;
}

function loadStatsFromDB(): StatsDB {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        visitCount: typeof parsed.visitCount === "number" ? parsed.visitCount : 1,
        trackPlayCounts: parsed.trackPlayCounts && typeof parsed.trackPlayCounts === "object" ? parsed.trackPlayCounts : {},
      };
    }
  } catch (err) {
    console.error("Error reading db counts.json:", err);
  }
  return {
    visitCount: 1,
    trackPlayCounts: {},
  };
}

function saveStatsToDB(data: StatsDB) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving db counts.json:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. 통계 데이터 조회 (방문자수 & 곡별 재생수)
  app.get("/api/stats", (req, res) => {
    const stats = loadStatsFromDB();
    res.json({
      visitCount: stats.visitCount,
      trackPlayCounts: stats.trackPlayCounts,
    });
  });

  // 2. 방문자 수(VISIT) 1 증가 및 저장
  app.post("/api/visit", (req, res) => {
    const stats = loadStatsFromDB();
    stats.visitCount = (stats.visitCount || 0) + 1;
    saveStatsToDB(stats);
    res.json({
      success: true,
      visitCount: stats.visitCount,
    });
  });

  // 3. 곡별 재생 수 1 증가 및 저장
  app.post("/api/track/play", (req, res) => {
    const { trackId } = req.body;
    if (!trackId) {
      return res.status(400).json({ error: "trackId is required" });
    }
    const stats = loadStatsFromDB();
    stats.trackPlayCounts[trackId] = (stats.trackPlayCounts[trackId] || 0) + 1;
    saveStatsToDB(stats);
    res.json({
      success: true,
      trackId,
      totalPlays: stats.trackPlayCounts[trackId],
    });
  });

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API routes
  app.post("/api/generate-playlist", async (req, res) => {
    const { mood } = req.body;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a professional YouTube playlist concept for the following mood/theme: "${mood}". 
        The tone should be cinematic and high-end. Provide a catchy title, a short description, 
        a list of 5 fictional track names with artists, and a visual theme suggestion for the video background.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              tracks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    artist: { type: Type.STRING },
                    duration: { type: Type.STRING }
                  },
                  required: ["title", "artist", "duration"]
                }
              },
              visualTheme: { type: Type.STRING }
            },
            required: ["title", "description", "tracks", "visualTheme"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("The AI model failed to return a content response.");
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate playlist" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

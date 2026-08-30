import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ==================================================================================
// 📁 브라우저의 localStorage와 똑같은 서버 로컬 JSON 저장소 (data/store.json)
// ==================================================================================
const STORE_PATH = path.join(process.cwd(), "data", "store.json");

interface ServerStore {
  visit: number;
  plays: Record<string, number>;
}

const ServerStorage = {
  get: (): ServerStore => {
    try {
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        return {
          visit: typeof parsed.visit === "number" ? parsed.visit : 1,
          plays: parsed.plays && typeof parsed.plays === "object" ? parsed.plays : {},
        };
      }
    } catch (err) {
      console.error("Error reading store.json:", err);
    }
    return { visit: 1, plays: {} };
  },
  save: (data: ServerStore) => {
    try {
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("Error saving store.json:", err);
    }
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 브라우저 응답 캐싱 방지 헤더
  app.use("/api", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    next();
  });

  // [1] 카운트 전체 조회 및 접속 방문자 +1
  app.get("/api/count/visit", (req, res) => {
    const store = ServerStorage.get();
    store.visit = (store.visit || 0) + 1;
    ServerStorage.save(store);
    res.json(store);
  });

  // [2] 카운트 단순 조회 (증가 없이 읽기만)
  app.get("/api/count/stats", (req, res) => {
    const store = ServerStorage.get();
    res.json(store);
  });

  // [3] 곡 재생 시 해당 곡 +1
  app.post("/api/count/play", (req, res) => {
    const { trackId } = req.body;
    if (!trackId) {
      return res.status(400).json({ error: "trackId is required" });
    }
    const store = ServerStorage.get();
    if (!store.plays) store.plays = {};
    store.plays[trackId] = (store.plays[trackId] || 0) + 1;
    ServerStorage.save(store);
    res.json(store);
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

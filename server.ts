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

interface UserUploadedTrack {
  id: string;
  number: string;
  title: string;
  duration: string;
  nickname?: string;
  genreTag?: string;
  channelUrl?: string;
  description?: string;
  albumId: string;
  audioUrl: string;
  phone?: string;
  password?: string;
  createdAt?: number;
}

interface ServerStore {
  visit: number;
  plays: Record<string, number>;
  userTracks?: UserUploadedTrack[];
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
          userTracks: Array.isArray(parsed.userTracks) ? parsed.userTracks : [],
        };
      }
    } catch (err) {
      console.error("Error reading store.json:", err);
    }
    return { visit: 1, plays: {}, userTracks: [] };
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

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

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

  // [4] 사용자 등록 음원 목록 조회
  app.get("/api/tracks/user", (req, res) => {
    const store = ServerStorage.get();
    res.json({ tracks: store.userTracks || [] });
  });

  // [5] 사용자 음원 등록
  app.post("/api/tracks/user", (req, res) => {
    const track = req.body;
    if (!track || !track.id || !track.title) {
      return res.status(400).json({ error: "올바른 트랙 데이터가 아닙니다." });
    }

    const store = ServerStorage.get();
    if (!store.userTracks) store.userTracks = [];

    // 1000곡 등록 제한 체크
    const totalCount = 6 + store.userTracks.length; // 기본곡 6곡 + 사용자 등록곡
    if (totalCount >= 1000) {
      return res.status(400).json({ error: "AI음악 아티스트 테마에 1,000곡이 모두 등록되어 추가 업로드가 불가능합니다." });
    }

    store.userTracks.push(track);
    ServerStorage.save(store);
    res.json({ success: true, track, total: totalCount + 1 });
  });

  // [6] 사용자 음원 삭제 (전화번호 & 비밀번호 검증)
  app.post("/api/tracks/user/delete", (req, res) => {
    const { trackId, phone, password } = req.body;
    if (!trackId) {
      return res.status(400).json({ error: "trackId is required" });
    }

    const store = ServerStorage.get();
    if (!store.userTracks) store.userTracks = [];

    const targetIdx = store.userTracks.findIndex(t => t.id === trackId);
    if (targetIdx === -1) {
      return res.status(404).json({ error: "삭제할 음원을 찾을 수 없습니다." });
    }

    const targetTrack = store.userTracks[targetIdx];
    const inputPhoneDigits = (phone || '').replace(/[^0-9]/g, '');
    const trackPhoneDigits = (targetTrack.phone || '').replace(/[^0-9]/g, '');

    if (inputPhoneDigits !== trackPhoneDigits) {
      return res.status(403).json({ error: "등록된 전화번호와 일치하지 않습니다." });
    }

    if (targetTrack.password && targetTrack.password !== password) {
      return res.status(403).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    store.userTracks.splice(targetIdx, 1);
    ServerStorage.save(store);
    res.json({ success: true, deletedId: trackId });
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

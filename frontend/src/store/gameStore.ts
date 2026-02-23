import { create } from 'zustand';

interface GameState {
  stage: "JET" | "MORPH" | "SPACE";
  altitude: number; // 0 to 100000+
  mission: any | null;
  setStage: (stage: "JET" | "MORPH" | "SPACE") => void;
  setAltitude: (alt: number) => void;
  setMission: (mission: any) => void;
}

export const useGameStore = create<GameState>((set) => ({
  stage: "JET",
  altitude: 0,
  mission: null,
  setStage: (stage) => set({ stage }),
  setAltitude: (altitude) => set({ altitude }),
  setMission: (mission) => set({ mission }),
}));

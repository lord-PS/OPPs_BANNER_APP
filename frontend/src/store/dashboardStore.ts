import { create } from 'zustand';

type ViewType = "NONE" | "FLIGHT_LOG" | "SPELL_BOOK" | "ARSENAL" | "TIMELINE" | "COMMUNICATIONS";

interface DashboardState {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  closeView: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentView: "NONE",
  setView: (view) => set({ currentView: view }),
  closeView: () => set({ currentView: "NONE" }),
}));

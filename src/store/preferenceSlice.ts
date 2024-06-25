import { type Slice } from "./utils";

export type EntityMode = "aircraft" | "plans" | "areas" | "tracks" | "effects";

interface EntityModeSlice {
  entityMode: EntityMode;
  showEntityPane: boolean;
  setEntityMode: (entityMode: EntityMode) => void;
  setShowEntityPane: (showEntityPane: boolean) => void;
}

interface AAPSlice {
  actionPanelVisibility: boolean;
  setActionPanelVisibility: (actionPanelVisibility: boolean) => void;
}

export type PreferenceSlice = EntityModeSlice & AAPSlice;

const getPreferenceSlice: Slice<PreferenceSlice> = (set) => ({
  entityMode: "plans",
  showEntityPane: false,
  actionPanelVisibility: true,
  setEntityMode: (entityMode: EntityMode) => set({ entityMode }),
  setShowEntityPane: (showEntityPane: boolean) => set({ showEntityPane }),
  setActionPanelVisibility: (actionPanelVisibility: boolean) =>
    set({ actionPanelVisibility }),
});

export default getPreferenceSlice;

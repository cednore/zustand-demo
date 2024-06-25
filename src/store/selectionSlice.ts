import { type Slice } from "./utils";

export interface SelectionSlice {
  hoveredEntityId: string;
  selectedEntities: Record<string, boolean>;
  mouseIsOverEffectPlusId: string;
  setHoveredEntityId: (hoveredEntityId: string) => void;
  setSelectedEntities: (selectedEntities: Record<string, boolean>) => void;
  setMouseIsOverEffectPlusId: (id: string) => void;
}

const getSelectionSlice: Slice<SelectionSlice> = (set) => ({
  hoveredEntityId: "",
  selectedEntities: {},
  mouseIsOverEffectPlusId: "",
  setHoveredEntityId: (hoveredEntityId: string) => set({ hoveredEntityId }),
  setSelectedEntities: (selectedEntities: Record<string, boolean>) =>
    set({ selectedEntities }),
  setMouseIsOverEffectPlusId: (mouseIsOverEffectPlusId: string) =>
    set({ mouseIsOverEffectPlusId }),
});

export default getSelectionSlice;

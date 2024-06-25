import { ReactSVG } from "react";
import { type Slice } from "./utils";

export enum ActionType {
  ACCEPT,
  BACK,
  CANCEL,
  REJECT,
  REVERT,
}

export interface ActionItem {
  type: ActionType;
  hotkey: string;
  isMenu?: boolean;
  iconNode: React.FC<ReactSVG>;
  label: string;
}

export interface ActionPanelSlice {
  actionPanelPath: string;
  currentAction: ActionType | null;
  availableActions: ActionItem[];
  setCurrentAction: (currentAction: ActionType | null) => void;
  setActionPanelPath: (actionPanelPath: string) => void;
  setAvailableActions: (availableActions: ActionItem[]) => void;
}

const getActionPanelSlice: Slice<ActionPanelSlice> = (set) => ({
  actionPanelPath: "",
  actionPanelVisibility: false,
  currentAction: null,
  availableActions: [],
  setCurrentAction: (currentAction: ActionType | null) =>
    set({ currentAction }),
  setActionPanelPath: (actionPanelPath: string) => set({ actionPanelPath }),
  setAvailableActions: (availableActions: ActionItem[]) =>
    set({ availableActions }),
});

export default getActionPanelSlice;

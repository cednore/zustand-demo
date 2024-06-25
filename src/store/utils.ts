import microMemoize from "micro-memoize";
import { createSelectorCreator, lruMemoize } from "reselect";
import { shallowEqual } from "shallow-equal";
import { type StateCreator } from "zustand";

import { type ActionPanelSlice } from "./actionPanelSlice";
import { type PreferenceSlice } from "./preferenceSlice";
import { type SelectionSlice } from "./selectionSlice";

export type MutatorsIn = [
  ["zustand/immer", never],
  ["zustand/subscribeWithSelector", never]
];

export type SwarmStoreState = SelectionSlice &
  ActionPanelSlice &
  PreferenceSlice;

export type Slice<T> = StateCreator<SwarmStoreState, MutatorsIn, [], T>;

export const createAppSelector = createSelectorCreator({
  memoize: lruMemoize,
  argsMemoize: microMemoize,
  memoizeOptions: {
    maxSize: 1,
    equalityCheck: shallowEqual,
    resultEqualityCheck: shallowEqual,
  },
  argsMemoizeOptions: {
    isEqual: shallowEqual,
    maxSize: 1,
  },
  devModeChecks: {
    identityFunctionCheck: "never",
    inputStabilityCheck: "always",
  },
}).withTypes<SwarmStoreState>();

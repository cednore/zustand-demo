/* eslint-disable @typescript-eslint/unbound-method */
import { enableMapSet } from "immer";
import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import getActionPanelSlice from "./actionPanelSlice";
import getPreferenceSlice from "./preferenceSlice";
import getSelectionSlice from "./selectionSlice";
import reselectors from "./selectors";
import { type SwarmStoreState } from "./utils";

enableMapSet();

const useSwarmStoreBase = create<SwarmStoreState>()(
  persist(
    subscribeWithSelector(
      immer((...a) => ({
        ...getSelectionSlice(...a),
        ...getActionPanelSlice(...a),
        ...getPreferenceSlice(...a),
      }))
    ),
    {
      name: "legion-preference",
      partialize: (state) => ({
        entityMode: state.entityMode,
        showEntityPane: state.showEntityPane,
        actionPanelVisibility: state.actionPanelVisibility,
      }),
    }
  )
);

type SelectorReturnType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? () => R : never;
};

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & {
      use: { [K in keyof T]: () => T[K] };
      useSel: SelectorReturnType<typeof reselectors>;
      getSel: SelectorReturnType<typeof reselectors>;
    }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store> & {
    g: () => SwarmStoreState; // shorthand for useStore.getState()
  };
  const sel: SelectorReturnType<typeof reselectors> = {} as any;
  store.use = {}; // shorthand for useStore(state => state.blah)
  store.useSel = { ...sel }; // subscribe to store
  store.getSel = { ...sel }; // get state from store in a non-reactive way
  (store.g as any) = store.getState;

  for (const k of Object.keys(store.getState()))
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);

  for (const k of Object.keys(reselectors)) {
    (store.useSel as any)[k] = () =>
      store((s) =>
        reselectors[k as keyof typeof reselectors](s as SwarmStoreState)
      );
    (store.getSel as any)[k] = () =>
      reselectors[k as keyof typeof reselectors](store.getState() as any);
  }

  return store;
};

const useStore = createSelectors(useSwarmStoreBase);
(window as any).useStore = useStore; // for debugging purpose

export default useStore;
export { useSwarmStoreBase };

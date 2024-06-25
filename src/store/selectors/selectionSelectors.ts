import { createAppSelector } from "../utils";

export const isAreaSelected = createAppSelector(
  [(state) => state.entityMode],
  (entityMode) => {
    return entityMode === "areas";
  }
);

export const numSelected = createAppSelector(
  [(state) => state.selectedEntities],
  (selectedEntities) => {
    return Object.values(selectedEntities).filter((selected) => selected)
      .length;
  }
);

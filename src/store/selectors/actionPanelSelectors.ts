import { ActionType } from "../actionPanelSlice";
import { createAppSelector } from "../utils";

export const trueApplicable = createAppSelector([], () => true);
export const falseApplicable = createAppSelector([], () => false);

export const applicabilitySelector: Record<ActionType, any> = {
  [ActionType.ACCEPT]: trueApplicable,
  [ActionType.BACK]: trueApplicable,
  [ActionType.CANCEL]: trueApplicable,
  [ActionType.REJECT]: trueApplicable,
  [ActionType.REVERT]: trueApplicable,
};

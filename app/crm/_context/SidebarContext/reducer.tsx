export type SidebarState = {
  isOpen: boolean;
};
export type SidebarAction = { type: "open sidebar" | "close sidebar" };

export default function sidebarReducer(
  state: SidebarState,
  action: SidebarAction
): SidebarState {
  switch (action.type) {
    case "open sidebar":
      return { ...state, isOpen: true };
    case "close sidebar":
      return { ...state, isOpen: false };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

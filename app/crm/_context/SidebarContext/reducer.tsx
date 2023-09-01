export default function sidebarReducer(
  state: boolean,
  action: { type: string }
) {
  switch (action.type) {
    case "open sidebar":
      return true;
    case "close sidebar":
      return false;
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

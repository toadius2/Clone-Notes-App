import EditorEventType from "./editor-event-type";
export default [
  {
    text: "cut",
    command: EditorEventType.cut,
  },
  {
    text: "copy",
    command: EditorEventType.copy,
  },
  {
    text: "search",
    command: "search",
  },
  {
    divider: true,
  },
  {
    text: "rate",
    command: "rate",
  },
];

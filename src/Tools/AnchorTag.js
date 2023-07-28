import Quill from "quill";
let BlockEmbed = Quill.import("blots/block/embed");

export class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "a";

Quill.register(DividerBlot);

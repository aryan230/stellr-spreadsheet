import Quill from "quill";
let BlockEmbed = Quill.import("blots/block/embed");

export class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("id", "x-spreadsheet-demo");
    // node.setAttribute("src", value.url);
    return node;
  }

  static value(node) {
    return {
      id: node.getAttribute("id"),
      // url: node.getAttribute("src"),
    };
  }
}
ImageBlot.blotName = "image";
ImageBlot.tagName = "div";

Quill.register(ImageBlot);

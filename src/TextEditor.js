import React, { useCallback, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import mention from "quill-mention";
import { ImageBlot } from "./Tools/Image";
import { DividerBlot } from "./Tools/AnchorTag";
function TextEditor() {
  const atValues = [
    { id: 1, value: "Fredrik Sundqvist" },
    { id: 2, value: "Patrik Sjölin" },
  ];
  const hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" },
  ];
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
    ["img"],
    ["divider"],
  ];

  let quill;

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    wrapper.append(editor);
    quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: function (searchTerm, renderList, mentionChar) {
            let values;

            if (mentionChar === "@") {
              values = atValues;
            } else {
              values = hashValues;
            }

            if (searchTerm.length === 0) {
              renderList(values, searchTerm);
            } else {
              const matches = [];
              for (let i = 0; i < values.length; i++)
                if (
                  ~values[i].value
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase())
                )
                  matches.push(values[i]);
              renderList(matches, searchTerm);
            }
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (document.querySelector(".ql-img")) {
      document.querySelector(".ql-img").addEventListener("click", () => {
        let range = quill.getSelection(true);
        quill.insertText(range.index, "\n", Quill.sources.USER);
        quill.insertEmbed(
          range.index + 1,
          "image",
          {
            alt: "Quill Cloud",
            url: "https://quilljs.com/0.20/assets/images/cloud.png",
          },
          Quill.sources.USER
        );
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
      });
    }
  }, [document.querySelector(".ql-img")]);

  useEffect(() => {
    if (document.querySelector(".ql-divider")) {
      document.querySelector(".ql-divider").addEventListener("click", () => {
        let range = quill.getSelection(true);
        quill.insertText(range.index, "Hello World", Quill.sources.USER);
        quill.setSelection(range.index, Quill.sources.SILENT);
      });
    }
  }, [document.querySelector(".ql-divider")]);

  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;

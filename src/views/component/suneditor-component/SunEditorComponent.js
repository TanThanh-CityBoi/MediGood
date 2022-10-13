import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { firebaseStorageServices } from "../../../services";
// How to import plugins

const SuneditorComponent = ({
  initialContent = "",
  title = "Content",
  contentOnChange,
}) => {
  async function onImageUploadBefore(files, info, uploadHandler) {
    try {
      let images = [];
      for (const file of files) {
        await firebaseStorageServices.uploadFileToFirebase(
          file,
          "news",
          undefined,
          undefined,
          (url) => {
            let image = {
              url: url,
              name: file.name,
              size: file.size,
            };

            images.push(image);
          }
        );
      }

      const response = {
        result: images,
      };
      console.log({ response });

      uploadHandler(response);
    } catch (err) {
      console.log(err.toString());
    }

    return undefined;
  }

  return (
    <div>
      <p> {title} </p>
      <SunEditor
        autoFocus={true}
        width="100%"
        height="390px"
        setOptions={{
          buttonList: [
            // default
            ["undo", "redo"],
            ["formatBlock"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "removeFormat",
            ],
            [
              "fontColor",
              "hiliteColor",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "table",
            ],
            ["table", "link", "image"],
            ["codeView", "preview"],
            ["fullScreen"],
          ],
        }}
        setContents={initialContent}
        onChange={contentOnChange}
        // onImageUploadBefore={onImageUploadBefore}
      />
    </div>
  );
};
export default SuneditorComponent;

// src/Tiptap.tsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./components/ui/button";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const EditorJSONConsoleLogButton = () => {
  const { editor } = useCurrentEditor();

  const previewEditorJson = () => {
    console.log(editor?.getJSON());
  };

  return <Button onClick={previewEditorJson}>preview</Button>;
};

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorContainerProps={{
        className: "p-2 rounded-md border-2 border-solid",
      }}
      slotAfter={<EditorJSONConsoleLogButton />}
    >
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
};

export default Tiptap;

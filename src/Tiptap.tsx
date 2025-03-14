import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

const Preview = (props: { data: string; className?: string }) => {
  return (
    <div className={props.className}>
      <p className="text-xs font-mono  whitespace-pre-wrap">{props.data}</p>
    </div>
  );
};

const Tiptap: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: `<a href="https://github.com">Hello World!</a>`,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={75}>
        <EditorContent className="h-full p-2" editor={editor} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <Preview
          className="p-2 h-full bg-gray-300 "
          data={JSON.stringify(editor.getJSON(), null, 2)}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Tiptap;

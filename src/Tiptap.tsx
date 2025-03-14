import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import CopyToClipboardButton from "./CopyToClipboardButton";

const Preview = (props: { data: string; className?: string }) => {
  return (
    <ScrollArea className={props.className}>
      <CopyToClipboardButton text={props.data} />
      <p className="text-xs font-mono  whitespace-pre-wrap">{props.data}</p>
    </ScrollArea>
  );
};

const Tiptap: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({})],
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

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e instanceof Error ? e.message : "failed");
    }
  };

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={75}>
        <Button onClick={setLink}>Set Link</Button>
        <ScrollArea className="h-full p-2">
          <EditorContent editor={editor} />
        </ScrollArea>
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

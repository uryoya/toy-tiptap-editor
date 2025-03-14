import { Clipboard } from "lucide-react";
import { Button } from "./components/ui/button";

const CopyToClipboardButton = (props: { text: string }) => {
  return (
    <Button
      variant="outline"
      className=" cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(props.text);
      }}
    >
      <Clipboard />
    </Button>
  );
};

export default CopyToClipboardButton;

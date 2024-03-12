import { Button } from "@/components";
import { MoveUp } from "lucide-react";

export const Page_Layout_Footer = () => {
  return (
    <footer className="container py-1 text-right">
      <Button size="icon" className="rounded-full">
        <MoveUp />
      </Button>
    </footer>
  );
};

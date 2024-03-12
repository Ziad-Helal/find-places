import { ColorTheme_Toggler } from "@/components";

export const Page_Layout_Header = () => {
  return (
    <header className="container py-1 flex items-center justify-between">
      <h1 className="text-xl lg:text-3xl font-semibold uppercase">
        Find Places
      </h1>
      <div>
        <ColorTheme_Toggler />
      </div>
    </header>
  );
};

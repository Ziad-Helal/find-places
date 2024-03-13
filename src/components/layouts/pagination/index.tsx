import { Button } from "@/components";
import { useAppSelector } from "@/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, ReactNode } from "react";

interface Pagination_Props {
  children: ReactNode;
}

export const Pagination: FC<Pagination_Props> = ({ children }) => {
  const currentPage = useAppSelector(
    (state) => state.places.searchParameters.page
  );

  return (
    <section className="mt-4">
      <header className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
        <span>{currentPage || 1}</span>
        <Button variant="ghost" size="icon">
          <ChevronRight />
        </Button>
      </header>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
};

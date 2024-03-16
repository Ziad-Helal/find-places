import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getPlaces } from "@/store/places-slice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, ReactNode } from "react";

interface Pagination_Props {
  children: ReactNode;
}

export const Pagination: FC<Pagination_Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  // const {
  //   page: currentPage,
  //   gl: country,
  //   q: query,
  //   autocorrect,
  // } = useAppSelector((state) => state.places.searchParameters);

  // function getNextPage() {
  //   dispatch(getPlaces({}));
  // }

  // function getPreviousPage() {
  //   dispatch(getPlaces({}));
  // }

  return (
    <section className="mt-4">
      <header className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="Go to previous page"
          // disabled={currentPage == 1}
          // onClick={getPreviousPage}
        >
          <ChevronLeft />
        </Button>
        <span>{1}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="Go to next page"
          // onClick={getNextPage}
        >
          <ChevronRight />
        </Button>
      </header>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
};

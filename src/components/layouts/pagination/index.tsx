import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  firstPage,
  lastPage,
  nextPage,
  previousPage,
  setResultsPerPage,
} from "@/store/places-slice";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC, ReactNode } from "react";

interface Pagination_Props {
  children: ReactNode;
}

export const Pagination: FC<Pagination_Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { pagination, places } = useAppSelector((state) => state.places);

  function goToNextPage() {
    dispatch(nextPage());
  }

  function goToPreviousPage() {
    dispatch(previousPage());
  }

  function goToFirstPage() {
    dispatch(firstPage());
  }

  function goToLastPage() {
    dispatch(lastPage());
  }

  function changeResultsPerPage(newValue: string) {
    dispatch(setResultsPerPage(newValue));
  }

  return (
    <section className="mt-4">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Go to the first page"
            disabled={pagination?.page == 1}
            onClick={goToFirstPage}
          >
            <ChevronsLeft />
          </Button>
          <span>01</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Go to the previous page"
            disabled={pagination?.page == 1}
            onClick={goToPreviousPage}
          >
            <ChevronLeft />
          </Button>
          <span>{pagination?.page}</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Go to the next page"
            disabled={pagination!.page >= pagination!.lastPage}
            onClick={goToNextPage}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span>
            {pagination!.lastPage >= 10
              ? pagination?.lastPage
              : `0${pagination?.lastPage}`}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Go to the last page"
            disabled={pagination!.page >= pagination!.lastPage}
            onClick={goToLastPage}
          >
            <ChevronsRight />
          </Button>
        </div>
      </header>
      <div className="mt-2 space-y-2">{children}</div>
      <footer className="flex items-center justify-center gap-4 mt-4">
        <Select
          defaultValue={pagination?.resultsPerPage.toString()}
          onValueChange={changeResultsPerPage}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={pagination?.resultsPerPage} />
          </SelectTrigger>
          <SelectContent className="w-fit">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <p>Results per Page</p>
      </footer>
    </section>
  );
};

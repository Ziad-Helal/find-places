import { Place_Card_Skeleton, Skeleton } from "@/components";
import { useAppSelector } from "@/hooks";

export const Places_List_Skeleton = () => {
  const resultsPerPage = useAppSelector(
    (state) => state.places.pagination?.resultsPerPage
  );

  return (
    <>
      <Skeleton className="h-8 w-full mt-3" />
      <div className="mt-4">
        <Skeleton className="h-6 w-24 mx-auto" />
      </div>
      <div className="mt-2 space-y-2">
        {Array.from({ length: resultsPerPage || 10 }, (_, i) => (
          <Place_Card_Skeleton key={`placeCardSkeleton${i}`} />
        ))}
      </div>
      <Skeleton className="h-7 w-40 mt-4 mx-auto" />
    </>
  );
};

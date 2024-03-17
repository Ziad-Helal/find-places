import {
  Pagination,
  Place_Card,
  Place_Card_Skeleton,
  Skeleton,
} from "@/components";
import { useAppSelector } from "@/hooks";

export const Places_List = () => {
  const places = useAppSelector(
    (state) => state.places.pagination?.currentResults
  );
  const resultsPerPage = useAppSelector(
    (state) => state.places.pagination?.resultsPerPage
  );
  const loading = useAppSelector((state) => state.general.loading.places);

  return loading ? (
    <>
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
  ) : (
    places && (
      <Pagination>
        {places!.map((place) => (
          <Place_Card key={place.place_id} place={place} />
        ))}
      </Pagination>
    )
  );
};

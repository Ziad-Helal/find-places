import { Pagination, Place_Card, Places_List_Skeleton } from "@/components";
import { useAppSelector } from "@/hooks";

export const Places_List = () => {
  const places = useAppSelector(
    (state) => state.places.pagination?.currentResults
  );
  const loading = useAppSelector((state) => state.general.loading.places);

  return loading ? (
    <Places_List_Skeleton />
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

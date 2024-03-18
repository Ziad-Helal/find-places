import { Skeleton } from "@/components";

export const PlaceDetails_Skeletons = () => {
  return (
    <div>
      <div className="p-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-80 mt-2" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="w-16" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div>
            <Skeleton className="h-full w-80" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

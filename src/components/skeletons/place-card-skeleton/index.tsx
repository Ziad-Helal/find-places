import { Card, CardContent, CardHeader, Skeleton } from "@/components";

export const Place_Card_Skeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 items-center justify-between">
          <Skeleton className="h-5 w-60" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-10" />
      </CardContent>
    </Card>
  );
};

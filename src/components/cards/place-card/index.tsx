import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { Place } from "@/store/places-slice";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { DoorClosed, DoorOpen, MapPinned } from "lucide-react";
import { FC } from "react";

interface Place_Card_Props {
  place: Place;
}

export const Place_Card: FC<Place_Card_Props> = ({ place }) => {
  const {
    name,
    formatted_address,
    rating,
    user_ratings_total,
    place_id,
    opening_hours,
  } = place;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="sm:text-xl">{name}</CardTitle>
          <div className="p-1">
            {opening_hours?.open_now && opening_hours.open_now ? (
              <DoorOpen className="text-green-500" />
            ) : (
              <DoorClosed className="text-red-500" />
            )}
          </div>
        </div>
        <CardDescription>{formatted_address}</CardDescription>
      </CardHeader>
      {(place_id || rating) && (
        <CardContent className="flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            title={`${user_ratings_total} ratings`}
          >
            {rating >= 0 && (
              <>
                <StarFilledIcon className="text-yellow-500 scale-125" />
                <span>{rating} / 5</span>
              </>
            )}
          </div>
          {place_id && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${place_id}`}
              target="_blank"
              title="Open location on goolge maps"
            >
              <Button variant="ghost" size="icon" className="rounded-full p-2">
                <MapPinned />
              </Button>
            </a>
          )}
        </CardContent>
      )}
    </Card>
  );
};

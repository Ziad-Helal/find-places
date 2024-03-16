import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { Place } from "@/store/places-slice";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { PhoneCall } from "lucide-react";
import { FC } from "react";

interface Place_Card_Props {
  place: Place;
}

export const Place_Card: FC<Place_Card_Props> = ({ place }) => {
  const { name, formatted_address, rating, user_ratings_total } = place;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="sm:text-xl">{name}</CardTitle>
          {/* <p className="text-muted-foreground">{category}</p> */}
        </div>
        <CardDescription>{formatted_address}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          title={`${user_ratings_total} ratings`}
        >
          {rating && (
            <>
              <StarFilledIcon />
              <span>{rating} / 5</span>
            </>
          )}
        </div>
      </CardContent>
      {/* {(phoneNumber || rating) && (
        <CardContent className="flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            title={`${ratingCount} ratings`}
          >
            {rating && (
              <>
                <StarFilledIcon />
                <span>{rating} / 5</span>
              </>
            )}
          </div>
          {phoneNumber && (
            <a href={`tel:${phoneNumber}`} title={`Call: ${phoneNumber}`}>
              <PhoneCall />
            </a>
          )}
        </CardContent>
      )} */}
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { place } from "@/store/places-slice";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { PhoneCall } from "lucide-react";
import { FC } from "react";

interface Place_Card_Props {
  place: place;
}

export const Place_Card: FC<Place_Card_Props> = ({ place }) => {
  const { title, address, category, phoneNumber, rating, ratingCount } = place;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="sm:text-xl">{title}</CardTitle>
          <p className="text-muted-foreground">{category}</p>
        </div>
        <CardDescription>{address}</CardDescription>
      </CardHeader>
      {(phoneNumber || rating) && (
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
      )}
    </Card>
  );
};

import {
  Badge,
  Button,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  PlaceDetails_Skeletons,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Globe, MapPinned, PhoneCall } from "lucide-react";

export const PlaceDetails = () => {
  const isLoading = useAppSelector((state) => state.general.loading.place);
  const name = useAppSelector((state) => state.places.currentPlace?.name);
  const formatted_address = useAppSelector(
    (state) => state.places.currentPlace?.formatted_address
  );
  const rating = useAppSelector((state) => state.places.currentPlace?.rating);
  const user_ratings_total = useAppSelector(
    (state) => state.places.currentPlace?.user_ratings_total
  );
  const website = useAppSelector((state) => state.places.currentPlace?.website);
  const formatted_phone_number = useAppSelector(
    (state) => state.places.currentPlace?.formatted_phone_number
  );
  const opening_hours = useAppSelector(
    (state) => state.places.currentPlace?.opening_hours
  );
  const types = useAppSelector((state) => state.places.currentPlace?.types);
  const url = useAppSelector((state) => state.places.currentPlace?.url);

  return (
    <div className="container">
      {isLoading ? (
        <PlaceDetails_Skeletons />
      ) : (
        <>
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription>{formatted_address}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-2"
                title={`${user_ratings_total} ratings`}
              >
                {rating && rating > 0 && (
                  <>
                    <StarFilledIcon className="text-yellow-500 scale-125" />
                    <span>{rating} / 5</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                {url && (
                  <a href={url} target="_blank" title="Open in Google Maps">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MapPinned />
                    </Button>
                  </a>
                )}
                {website && (
                  <a href={website} target="_blank" title="Go to the website">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Globe />
                    </Button>
                  </a>
                )}
                {formatted_phone_number && (
                  <a
                    href={`tel:${formatted_phone_number}`}
                    target="_blank"
                    title={`Call ${formatted_phone_number}`}
                  >
                    <Button
                      variant="ghost"
                      className="rounded-full flex items-center gap-2 px-2.5"
                    >
                      <PhoneCall />
                      <span className="max-sm:hidden">
                        {formatted_phone_number}
                      </span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
            {opening_hours?.weekday_text[0] && (
              <div className="flex gap-2">
                {opening_hours?.open_now ? (
                  <Badge className="bg-green-500">Open</Badge>
                ) : (
                  <Badge variant="destructive">Closed</Badge>
                )}
                <div>
                  {opening_hours?.weekday_text.map((day) => (
                    <p key={day}>{day}</p>
                  ))}
                </div>
              </div>
            )}
            {types && types[0] && (
              <div className="mt-2 space-x-2">
                <span className="font-medium">Types: </span>
                {types.map((type) => (
                  <Badge key={type} variant="secondary" className="capitalize">
                    {type.split("_").join(" ")}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </>
      )}
    </div>
  );
};

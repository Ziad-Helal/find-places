import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { regions } from "@/assets/countries+states";
import { useState } from "react";
import { categories } from "@/assets/places-categories";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getPlaces } from "@/store/places-slice";
import { Input } from "@/components";
import { countries } from "@/assets/world-cities";

const FormSchema = z.object({
  country: z.string({
    required_error: "Please select a coutry.",
  }),
  city: z.string({ required_error: "Please select a city." }),
  category: z.string({ required_error: "Please select a place category." }),
  comment: z.string().optional(),
});

export function Query_Form() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const totalResults = useAppSelector(
    (state) => state.places.pagination?.totalResults
  );
  const fetching = useAppSelector((state) => state.general.loading.places);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [openCountries, setOpenCountries] = useState(false);
  const [openCities, setOpenCities] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      getPlaces({
        country: data.country,
        city: data.city,
        category: data.comment
          ? `${data.comment} ${data.category}`
          : data.category,
      })
    );
    setQuery(
      `${
        data.comment ? `${data.comment} ${data.category}` : data.category
      } places in ${data.city}, ${data.country}`
    );
    form.setValue("city", "");
    form.setValue("category", "");
    form.setValue("comment", "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={openCountries} onOpenChange={setOpenCountries}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? Object.keys(countries).find(
                            (country) => country == field.value
                          )
                        : "Select country"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search countries..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No countries found.</CommandEmpty>
                      <CommandGroup>
                        {Object.keys(countries).map((country, index) => (
                          <CommandItem
                            key={index + country}
                            value={country}
                            onSelect={() => {
                              form.setValue("country", country);
                              setOpenCountries(false);
                            }}
                          >
                            {country}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                country === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("country") && (
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={openCities} onOpenChange={setOpenCities}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries[form.getValues("country")].find(
                              (city) => city == field.value
                            )
                          : "Select city"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search cities..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No countries found.</CommandEmpty>
                        <CommandGroup>
                          {countries[form.getValues("country")].map(
                            (city, index) => (
                              <CommandItem
                                key={index + city}
                                value={city}
                                onSelect={() => {
                                  form.setValue("city", city);
                                  setOpenCities(false);
                                }}
                              >
                                {city}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    city === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            )
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues("country") && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={openCategories} onOpenChange={setOpenCategories}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category === field.value
                            )
                          : "Select place"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search places..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No places found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category}
                              key={category}
                              onSelect={() => {
                                form.setValue("category", category);
                                setOpenCategories(false);
                              }}
                            >
                              {category}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues("country") && (
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Somthing Specific..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues("country") && form.getValues("category") && (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
        {fetching ||
          (totalResults && query && (
            <p className="bg-foreground text-background p-2 rounded-lg">{`${totalResults} ${query}`}</p>
          ))}
      </form>
    </Form>
  );
}

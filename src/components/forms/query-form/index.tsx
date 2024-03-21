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
import { useState } from "react";
import { categories } from "@/assets/categories";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getPlaces } from "@/store/places-slice";
import { Input } from "@/components";
import {
  callCities,
  callCountries,
  callDistricts,
} from "@/store/general-slice";
import { continents } from "@/assets/continents";

const FormSchema = z.object({
  continent: z.string({ required_error: "Please select a continent." }),
  country: z.string({
    required_error: "Please select a coutry.",
  }),
  city: z.string({ required_error: "Please select a city." }),
  district: z.string({ required_error: "Please select a district" }),
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
  const countries = useAppSelector((state) => state.general.countries);
  const cities = useAppSelector((state) => state.general.cities);
  const districts = useAppSelector((state) => state.general.districts);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [openContinents, setOpenContinents] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);
  const [openCities, setOpenCities] = useState(false);
  const [openDistricts, setOpenDistricts] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  function getCountries(continentGeonameId: number) {
    dispatch(callCountries(continentGeonameId));
  }

  function getCities(countryGeonameId: number) {
    dispatch(callCities(countryGeonameId));
  }

  function getDistricts(countryCode: string, adminCode1: string) {
    dispatch(callDistricts(countryCode, adminCode1));
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      getPlaces({
        country: data.country,
        city: data.city,
        district: data.district,
        category: data.comment
          ? `${data.comment} ${data.category}`
          : data.category,
      })
    );
    setQuery(
      `${
        data.comment ? `${data.comment} ${data.category}` : data.category
      } places in ${data.district}, ${data.city}, ${data.country}`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
        <FormField
          control={form.control}
          name="continent"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={openContinents} onOpenChange={setOpenContinents}>
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
                        ? continents.find(({ name }) => name == field.value)!
                            .name
                        : "Select a Continent"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={`Search in ${continents.length} continents...`}
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No continents found.</CommandEmpty>
                      <CommandGroup>
                        {continents.map(({ name, geonameId }) => (
                          <CommandItem
                            key={geonameId}
                            value={name}
                            onSelect={() => {
                              form.setValue("district", "");
                              form.setValue("city", "");
                              form.setValue("country", "");
                              form.setValue("continent", name);
                              getCountries(geonameId);
                              setOpenContinents(false);
                            }}
                          >
                            {name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                name === field.value
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
        {form.getValues("continent") && countries && (
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
                          ? countries.find(({ name }) => name == field.value)!
                              .name
                          : "Select a Country"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search in ${countries.length} countries...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No countries found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map(({ name, geonameId }) => (
                            <CommandItem
                              key={geonameId}
                              value={name}
                              onSelect={() => {
                                form.setValue("district", "");
                                form.setValue("city", "");
                                form.setValue("country", name);
                                getCities(geonameId);
                                setOpenCountries(false);
                              }}
                            >
                              {name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  name === field.value
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
        {form.getValues("country") && cities && (
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
                          ? cities.find(({ name }) => name == field.value)!.name
                          : "Select a City"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search in ${cities.length} cities...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No cities found.</CommandEmpty>
                        <CommandGroup>
                          {cities.map(
                            ({ name, countryCode, geonameId, adminCode1 }) => (
                              <CommandItem
                                key={geonameId}
                                value={name}
                                onSelect={() => {
                                  form.setValue("district", "");
                                  form.setValue("city", name);
                                  setOpenCities(false);
                                  getDistricts(countryCode, adminCode1);
                                }}
                              >
                                {name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    name === field.value
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
        {form.getValues("city") && districts && (
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={openDistricts} onOpenChange={setOpenDistricts}>
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
                          ? districts.find(
                              (district) => district == field.value
                            )
                          : "Select a District"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search in ${districts.length} districts...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No districts found.</CommandEmpty>
                        <CommandGroup>
                          {districts.map((district, index) => (
                            <CommandItem
                              key={index + district}
                              value={district}
                              onSelect={() => {
                                form.setValue("district", district);
                                setOpenDistricts(false);
                              }}
                            >
                              {district}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  district === field.value
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
        {form.getValues("district") && (
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
                          : "Select a Business Category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search in ${categories.length} business categories...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
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
        {form.getValues("category") && (
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Somthing more Specific..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.getValues("district") && (
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

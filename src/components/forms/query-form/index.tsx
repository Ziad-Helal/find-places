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
  // const { gl: country, autocorrect } = useAppSelector(
  //   (state) => state.places.searchParameters
  // );
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
        category: data.category,
      })
    );
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
                        ? regions.find(({ name }) => name === field.value)?.name
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
                        {regions.map(({ name, numeric_code }) => (
                          <CommandItem
                            value={name}
                            key={numeric_code}
                            onSelect={() => {
                              form.setValue("country", name);
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
                          ? regions[
                              regions.findIndex(
                                ({ name }) => name === form.getValues("country")
                              )
                            ].states.find(({ name }) => name === field.value)
                              ?.name
                          : "Select city"}
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
                          {regions[
                            regions.findIndex(
                              ({ name }) => name === form.getValues("country")
                            )
                          ].states.map(({ id, name }) => (
                            <CommandItem
                              value={name}
                              key={id}
                              onSelect={() => {
                                form.setValue("city", name);
                                setOpenCities(false);
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
        {/* {form.getValues("country") && (
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
        )} */}
        {form.getValues("country") && form.getValues("category") && (
          <div className="items-center justify-between md:flex">
            <p className="my-1 text-center md:text-start">{`Scrap the maps for ${form.getValues(
              "category"
            )} places in ${
              form.getValues("city") ? `${form.getValues("city")}, ` : ""
            }${form.getValues("country")}?`}</p>
            <Button type="submit" size="sm" className="w-full md:w-auto">
              Submit
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

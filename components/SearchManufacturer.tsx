"use client";

import { searchManufacturerProps } from "@types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { manufacturers } from "@constants";

function SearchManufacturer({
  manufacturer,
  setManufacturer,
}: searchManufacturerProps) {
  const [query, setQuery] = useState("");

  const filterdManufacturer =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLocaleLowerCase()
            .replace("/s+/g", "")
            .includes(query.toLocaleLowerCase().replace("/s+/g", ""))
        );
  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top=[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacture: string) => manufacture}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filterdManufacturer?.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-manufacturer__option"
                >
                  Nothing found like "{query}"
                </Combobox.Option>
              ) : (
                filterdManufacturer?.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default SearchManufacturer;

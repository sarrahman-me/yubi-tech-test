"use client";
import React, { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { GetDataApi } from "@/utils/fetcher";
import { IoIosArrowDown } from "react-icons/io";
import Label from "../label";

interface SelectProps {
  value?: any;
  setValue: (value: any) => void;
  staticData?: boolean;
  lists?: any[];
  urlDataApi?: string;
  keyValue: {
    key: string;
    value: string;
  };
  placeholder?: string;
  label?: string;
}

const Select = ({
  setValue,
  value,
  placeholder,
  lists = [],
  keyValue,
  label,
  urlDataApi,
  staticData,
}: SelectProps) => {
  const [dataApi, setDataApi] = useState<any>([]);
  const [selectedItem, setSelected] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      if (urlDataApi) {
        const response = await GetDataApi(urlDataApi);

        setDataApi(response.data.data);
      }
    };

    fetchData();
  }, [urlDataApi]);

  const dataToUse: any[] = staticData ? lists : dataApi;

  useEffect(() => {
    if (value && keyValue && dataToUse.length > 0) {
      const selectedItemFromValue = dataToUse.find(
        (item) => item[keyValue.key] === value
      );
      if (selectedItemFromValue) {
        setSelected(selectedItemFromValue);
      }
    } else {
      setSelected({});
    }
  }, [value, keyValue, dataToUse]);

  const handleSelectChange = (selectedItem: any) => {
    const selectedKey = selectedItem[keyValue.key];
    setValue(selectedKey);
    setSelected(selectedItem);
  };

  return (
    <div className={`${dataToUse.length === 0 ? "hidden" : ""}`}>
      {label && <Label htmlFor={label}>{label}</Label>}

      <Listbox value={selectedItem} onChange={handleSelectChange}>
        {/* tombol untuk pilih data */}
        <ListboxButton className="flex justify-between items-center bg-secondary placeholder-secondary-medium/20 disabled:bg-gray-200 disabled:cursor-not-allowed outline-none border text-secondary-medium rounded focus:ring-primary-600 focus:border-primary-600 w-full p-2 min-w-36">
          <p>{selectedItem[keyValue.value] || placeholder}</p>
          <IoIosArrowDown />
        </ListboxButton>

        {/* pilihan listbox */}
        <ListboxOptions className="bg-secondary placeholder-secondary-medium/20 disabled:bg-gray-200 disabled:cursor-not-allowed text-secondary-medium rounded focus:ring-primary-600 focus:border-primary-600 block w-full min-w-36 mt-2 p-1.5 border border-primary-600 ring-primary-600 shadow-md max-h-48 overflow-scroll outline-none">
          {dataToUse.map((list, i) => (
            <ListboxOption key={i} value={list}>
              {({ focus, selected }) => (
                <div
                  className={`${
                    selected
                      ? "bg-primary-500 text-white"
                      : focus
                      ? "bg-primary-50 text-primary-800"
                      : "bg-white text-black"
                  } cursor-pointer select-none p-1.5 rounded-md`}
                >
                  {list[keyValue.value]}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default Select;

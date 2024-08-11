"use client";
import { GetDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import Label from "../label";

const CheckboxGroup = ({
  setList,
  list,
  options = [],
  metadata,
  urlDataApi,
  label,
}: {
  setList: (list: any) => void;
  list: any[];
  options?: any[];
  urlDataApi?: string;
  label?: string;
  metadata: {
    key: string;
    data: string;
  };
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (urlDataApi) {
        const response = await GetDataApi(urlDataApi);

        setData(response.data.data);
      }
    };

    fetchData();
  }, [urlDataApi]);

  const handleCheckboxChange = (key: any) => {
    const isChecked = list.includes(key);

    if (isChecked) {
      // Uncheck item
      const updatedList = list.filter((itemId) => itemId !== key);
      setList(updatedList);
    } else {
      // Check item
      setList([...list, key]);
    }
  };

  const optionsToUse: any[] = options.length > 0 ? options : data;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {optionsToUse.map((item: any, i: number) => (
        <div key={i} className="flex items-center">
          <input
            type="checkbox"
            checked={list.includes(item[metadata.key])}
            onChange={() => handleCheckboxChange(item[metadata.key])}
            className="mr-2 accent-primary-500"
          />
          <label className="text-secondary-medium">
            {item[metadata.data]}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;

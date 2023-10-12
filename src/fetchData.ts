import { SortingState } from "@tanstack/react-table";
import { Nus3Info } from "./components/Table";

export const fetchSortedData = async (sorting: SortingState) => {
  await new Promise((r) => setTimeout(r, 500));

  if (sorting.find((v) => v.desc)) {
    return [
      {
        id: "3",
        name: "name-3",
        creator: "creator-3",
        createdAt: "2021-01-01",
        description: "description-3",
      },
      {
        id: "2",
        name: "name-2",
        creator: "creator-2",
        createdAt: "2021-01-01",
        description: "description-2",
      },
      {
        id: "1",
        name: "name-1",
        creator: "creator-1",
        createdAt: "2021-01-01",
        description: "description-1",
      },
    ];
  }

  const data: Nus3Info[] = [
    {
      id: "1",
      name: "name-1",
      creator: "creator-1",
      createdAt: "2021-01-01",
      description: "description-1",
    },
    {
      id: "2",
      name: "name-2",
      creator: "creator-2",
      createdAt: "2021-01-01",
      description: "description-2",
    },
    {
      id: "3",
      name: "name-3",
      creator: "creator-3",
      createdAt: "2021-01-01",
      description: "description-3",
    },
  ];

  return data;
};

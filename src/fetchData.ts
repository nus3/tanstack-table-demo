import { PaginationState, SortingState } from "@tanstack/react-table";
import { Nus3Info } from "./components/DemoTable";

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

export const fetchPaginationData = async (
  pageIndex: PaginationState["pageIndex"]
) => {
  await new Promise((r) => setTimeout(r, 500));

  if (pageIndex === 0) {
    return {
      data: [
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
      ],
      count: 7,
    };
  }

  if (pageIndex === 1) {
    return {
      data: [
        {
          id: "4",
          name: "name-4",
          creator: "creator-4",
          createdAt: "2021-01-01",
          description: "description-4",
        },
        {
          id: "5",
          name: "name-5",
          creator: "creator-5",
          createdAt: "2021-01-01",
          description: "description-5",
        },
        {
          id: "6",
          name: "name-6",
          creator: "creator-6",
          createdAt: "2021-01-01",
          description: "description-6",
        },
      ],
      count: 7,
    };
  }

  if (pageIndex === 2) {
    return {
      data: [
        {
          id: "7",
          name: "name-7",
          creator: "creator-7",
          createdAt: "2021-01-01",
          description: "description-7",
        },
      ],
      count: 7,
    };
  }

  const data: Nus3Info[] = [];

  return {
    data,
    count: 7,
  };
};

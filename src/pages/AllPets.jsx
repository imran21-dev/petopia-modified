import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import noResule from "../assets/noresult.json";
import { Button } from "@/components/ui/button";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Lottie from "lottie-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const { user, demoLoadTheme } = useContext(AssetContext);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: allPets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPets", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-pets?email=${user.email}`);
      return res.data;
    },
  });

  const [themeMode, setThemeMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: "#3490dc" },
      secondary: { main: "#f9802c" },
      text: {
        light: "#1a202c",
        dark: "#ffffff",
      },
    },
  });
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, [demoLoadTheme]);

  const navigate = useNavigate();
  const handleUpdate = async (pet) => {
    const id = await pet._id;
    navigate(`/dashboard/update-pet-admin/${id}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const [petId, setPetId] = useState(null);
  const handleDelete = (pet) => {
    setIsOpen(true);
    setPetId(pet._id);
  };
  const handleContinue = () => {
    setSpin(true);
    axiosSecure
      .delete(`/delete-pet?email=${user.email}&petId=${petId}`)
      .then((res) => {
        if (res.data.deletedCount) {
          refetch();
          setSpin(false);
          toast({
            title: "Pet Deleted!",
            description: "Your pet is successfully deleted.",
          });
        }
      });
  };
  const [isOpenAdopt, setIsOpenAdopt] = useState(false);
  const [isOpenUnadopt, setIsOpenUnadopt] = useState(false);
  const [spinAdopt, setSpinAdopt] = useState(false);
  const handleAdopt = (pet) => {
    setIsOpenAdopt(true);
    setPetId(pet._id);
  };

  const handleUnadopt = (pet) => {
    setIsOpenUnadopt(true);
    setPetId(pet._id);
  };

  const handleContinueUnadopt = () => {
    setSpinAdopt(true);
    axiosSecure
      .patch(`/update-unadopt?petId=${petId}&email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpinAdopt(false);
          refetch();
          toast({
            title: "Pet Unadopted!",
            description: "Your pet is successfully unadopted.",
          });
        }
      });
  };

  const handleContinueAdopt = () => {
    setSpinAdopt(true);
    axiosSecure
      .patch(`/update-adopt?petId=${petId}&email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpinAdopt(false);
          refetch();
          toast({
            title: "Pet Adopted!",
            description: "Your pet is successfully adopted.",
          });
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial",
        cell: (info) => (currentPage - 1) * pageSize + info.row.index + 1,
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
      },
      {
        accessorKey: "pet_name",
        header: "Pet Name",
      },
      {
        accessorKey: "pet_category",
        header: "Category",
      },
      {
        accessorKey: "pet_image",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="lg:w-12 w-8 lg:h-12 h-8 object-cover mx-auto rounded-full"
          />
        ),
      },
      {
        accessorKey: "adopted",
        header: "Adoption Status",
        cell: (info) => (
          <div className=" flex justify-center">
            <span
              className={`px-3 py-1 rounded-full font-medium  md:text-sm  ${
                info.getValue()
                  ? "bg-green-500/20 text-green-500"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {info.getValue() ? "Adopted" : "Not Adopted"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
        cell: (info) => (
          <div className="grid grid-cols-3 justify-items-center">
            {!info.row.original.adopted ? (
              <Button
                className="md:text-sm text-xs h-max"
                variant="secondary"
                onClick={() => handleUpdate(info.row.original)}
              >
                Update
              </Button>
            ) : (
              <Button
                className="md:text-sm text-xs h-max"
                variant="secondary"
                disabled
              >
                Update
              </Button>
            )}

            {!info.row.original.adopted ? (
              <Button
                className="md:text-sm text-xs h-max"
                onClick={() => handleAdopt(info.row.original)}
              >
                Adopt
              </Button>
            ) : (
              <Button
                className="md:text-sm text-xs h-max"
                variant="secondary"
                onClick={() => handleUnadopt(info.row.original)}
              >
                Unadopt
              </Button>
            )}

            <Button
              className="md:text-sm text-xs h-max"
              variant="secondary"
              onClick={() => handleDelete(info.row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: allPets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const handlePageChange = (event, newPage) => {
    table.setPageIndex(newPage - 1);
  };

  return (
    <div className="w-full text-center lg:text-left">
      <Helmet>
        <title>All Pets | Petopia</title>
      </Helmet>
      <h1 className="text-lg md:text-2xl font-bold">
        All Pets - {allPets?.length}
      </h1>
      <p className="mb-4 text-xs md:text-sm opacity-70 pt-1">
        View and Manage All Pets in One Place.
      </p>

      <section className="w-full ">
        {isLoading ? (
          <div className="flex flex-col w-full gap-3">
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
            <Skeleton className="w-full h-14 bg-secondary"></Skeleton>
          </div>
        ) : allPets.length < 1 ? (
          <div className="w-full justify-center flex items-center pt-10">
            <Lottie className="w-96" animationData={noResule}></Lottie>
          </div>
        ) : (
          <div className="my-table overflow-x-auto mx-auto">
            {!isLoading && (
              <table className="w-max xl:w-full border-collapse ">
                <thead className="bg-primary/20">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="border text-sm md:text-base text-center px-2 md:px-4 py-1 md:py-2 cursor-pointer hover:bg-primary/20"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" && (
                            <IoArrowUp className="inline ml-2" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <IoArrowDown className="inline ml-2" />
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-primary/5 text-xs md:text-base text-center"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="border px-2 md:px-4 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {isLoading ? (
          ""
        ) : allPets.length < 11 ? (
          ""
        ) : (
          <div className="py-3 flex  justify-center">
            <ThemeProvider theme={theme}>
              <Pagination
                count={table.getPageCount()}
                page={table.getState().pagination.pageIndex + 1}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color:
                      themeMode === "light"
                        ? theme.palette.text.light
                        : theme.palette.text.dark,
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              />
            </ThemeProvider>
          </div>
        )}
      </section>

      <AlertDialog open={isOpenUnadopt} onOpenChange={setIsOpenUnadopt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to Unadopt this pet?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenUnadopt(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={spinAdopt}
              onClick={handleContinueUnadopt}
            >
              {spinAdopt && <ImSpinner3 className="animate-spin" />}Yes, Unadopt
              it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenAdopt} onOpenChange={setIsOpenAdopt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to adopt this pet?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenAdopt(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-500"
              disabled={spinAdopt}
              onClick={handleContinueAdopt}
            >
              {spinAdopt && <ImSpinner3 className="animate-spin" />}Yes, Adopt
              it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete it? This action will delete your
              pet permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              disabled={spin}
              onClick={handleContinue}
            >
              {spin && <ImSpinner3 className="animate-spin" />}Yes, Delete it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllPets;

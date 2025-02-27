import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Pagination } from "@mui/material";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
import noResule from "../assets/noresult.json";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
const AdoptionRequest = () => {
  const { user, demoLoadTheme } = useContext(AssetContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request?email=${user.email}`);
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

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdopt, setIsOpenAdopt] = useState(false);
  const [spinAdopt, setSpinAdopt] = useState(false);
  const [spin, setSpin] = useState(false);
  const [petId, setPetId] = useState(null);
  const [listingPetId, setListinPetId] = useState(null);
  const handleReject = (pet) => {
    setPetId(pet._id);
    setIsOpen(true);
  };

  const handleContinue = () => {
    setSpin(true);
    axiosSecure
      .delete(`/request?id=${petId}&email=${user.email}`)
      .then((res) => {
        if (res.data.deletedCount) {
          setSpin(false);
          refetch();
          toast({
            title: "Request Rejected!",
            description: "The request has been rejected!",
          });
        }
      });
  };

  const handleAccept = (pet) => {
    setPetId(pet._id);
    setListinPetId(pet.petId);
    setIsOpenAdopt(true);
  };
  const handleContinueAdopt = () => {
    setSpinAdopt(true);
    axiosSecure
      .delete(
        `/request-accept?requestId=${petId}&petId=${listingPetId}&email=${user.email}`
      )
      .then((res) => {
        if (res.data.deletedCount) {
          setSpinAdopt(false);
          refetch();
          toast({
            title: "Request Accepted!",
            description: "You just accepted this request!",
          });
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "requesterImage",
        header: "User",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="lg:w-12 w-8 lg:h-12 h-8  object-cover mx-auto rounded-full"
          />
        ),
      },

      {
        accessorKey: "requesterName",
        header: "Name",
      },
      {
        accessorKey: "requesterNumber",
        header: "Number",
      },
      {
        accessorKey: "requesterEmail",
        header: "Email",
      },
      {
        accessorKey: "requesterLocation",
        header: "Location",
      },
      {
        accessorKey: "petImage",
        header: "Pet",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="lg:w-12 w-8 lg:h-12 h-8 object-cover mx-auto rounded-full"
          />
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2 justify-center">
            <Button className='md:text-sm text-xs h-max' onClick={() => handleAccept(info.row.original)}>
              Accept
            </Button>
            <Button
            className='md:text-sm text-xs h-max'
              onClick={() => handleReject(info.row.original)}
              variant="secondary"
            >
              Reject
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: requests,
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
    <div className=" w-full text-center lg:text-left">
       <Helmet>
        <title>Adoption Requests | Petopia</title>
      </Helmet>
      <h1 className="text-lg md:text-2xl font-bold">
        Adoption Requests - {requests?.length}
      </h1>
      <p className="mb-4 text-xs md:text-sm opacity-70 pt-1">
        Manage All Pet Adoption Requests with Ease – Accept or Reject
        Seamlessly.
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
      ) : requests.length < 1 ? (
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
                  <tr key={row.id} className="hover:bg-primary/5 text-xs md:text-base text-center">
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
      ) : requests.length < 11 ? (
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

      <AlertDialog open={isOpenAdopt} onOpenChange={setIsOpenAdopt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject it? This action will delete this
              request permanently.
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
              {spinAdopt && <ImSpinner3 className="animate-spin" />}Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject it? This action will delete this
              request permanently.
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
              {spin && <ImSpinner3 className="animate-spin" />}Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdoptionRequest;

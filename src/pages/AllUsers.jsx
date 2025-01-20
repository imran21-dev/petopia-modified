import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
import noResule from "../assets/noresult.json";
import { useToast } from "@/hooks/use-toast";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Pagination } from "@mui/material";

const AllUsers = () => {
  const { user, demoLoadTheme } = useContext(AssetContext);
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?email=${user.email}`);
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

  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const [userId, setUserId] = useState(null);
  const handleAdmin = (user) => {
    setUserId(user._id);
    setIsOpen(true);
  };

  const handleContinue = () => {
    setSpin(true);
    axiosSecure
      .patch(`/make-admin?email=${user.email}&id=${userId}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpin(false);
          refetch();
          toast({
            title: "The user now holds the role of Admin.",
            description: "The user has been successfully promoted to Admin.",
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
        accessorKey: "image",
        header: "Profile",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="w-12 h-12 object-cover mx-auto rounded-full"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },

      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
        cell: (info) => (
          <div className="">
            {info.row.original.role === "admin" ? (
              <Button disabled variant="secondary" className="w-2/3">
                Admin
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => handleAdmin(info.row.original)}
                className="w-2/3"
              >
                Make Admin
              </Button>
            )}
          </div>
        ),
      },
    ],
    []
  );
  const table = useReactTable({
    data: allUser,
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
    <div className="pt-2">
      <h1 className="text-2xl font-bold ">All Users - {allUser?.length}</h1>
      <p className="mb-4 text-sm opacity-70 pt-1">
        You can manage all the users from this page.
      </p>
      <div>
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
        ) : allUser.length < 1 ? (
          <div className="w-full justify-center flex items-center pt-10">
            <Lottie className="w-96" animationData={noResule}></Lottie>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {!isLoading && (
              <table className="w-full border-collapse ">
                <thead className="bg-primary/20">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="border text-center px-4 py-2 cursor-pointer hover:bg-primary/20"
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
                    <tr key={row.id} className="hover:bg-primary/5 text-center">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="border px-4 py-2">
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
      </div>

      {isLoading ? (
        ""
      ) : allUser.length < 11 ? (
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to make this user admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction disabled={spin} onClick={handleContinue}>
              {spin && <ImSpinner3 className="animate-spin" />}Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllUsers;

import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Lottie from "lottie-react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Pagination } from "@mui/material";
import { ImSpinner3 } from "react-icons/im";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import noResule from "../assets/noresult.json";
import { BarLoader } from "react-spinners";

const MyCampaigns = () => {
  const { user, demoLoadTheme } = useContext(AssetContext);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const axiosSecure = useAxiosSecure();

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

  const {
    data: campaigns,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/campaign?email=${user.email}`);
      return res.data;
    },
  });

  const [campId, setcampId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenResume, setIsOpenResume] = useState(false);
  const [spin, setSpin] = useState(false);

  const navigate = useNavigate();
  const handleEdit = async (campaign) => {
    const id = await campaign._id;
    navigate(`/dashboard/update-campaign/${id}`);
  };

  const handlePause = (campaign) => {
    setIsOpen(true);
    setcampId(campaign._id);
  };

  const handleContinue = () => {
    setSpin(true);
    axiosSecure
      .patch(`/campaign-pause?email=${user.email}&id=${campId}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpin(false);
          refetch();
          toast({
            title: "Campaign Paused Successfully!",
            description:
              "Your campaign is successfully paused. You can resume it anytime.",
          });
        } else {
          setSpin(false);
        }
      });
  };

  const handleResume = (campaign) => {
    setIsOpenResume(true);
    setcampId(campaign._id);
  };
  const handleContinueResume = () => {
    setSpin(true);
    axiosSecure
      .patch(`/campaign-resume?email=${user.email}&id=${campId}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpin(false);
          refetch();
          toast({
            title: "Campaign Activated!",
            description: "Your campaign is successfully activated.",
          });
        }
      });
  };

  const [isOpenDonators, setIsOpenDonators] = useState(false);
  const [donateCampId, setDonateCampId] = useState(null);

  const { data: donators, isLoading: donatorLoad } = useQuery({
    queryKey: ["donators", donateCampId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donators?id=${donateCampId}&email=${user.email}`
      );
      return res.data;
    },
  });

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
        accessorKey: "petName",
        header: "Pet Name",
      },
      {
        accessorKey: "petImage",
        header: "Pet",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
            className="lg:w-12 w-8 lg:h-12 h-8  object-cover mx-auto rounded-full"
          />
        ),
      },
      {
        accessorKey: "maxAmount",
        header: "Max Amount $",
        cell: (info) => {
          return <h1>$ {info.row.original.maxAmount}</h1>;
        },
      },
      {
        accessorKey: "donatedAmount",
        header: "Donation Progress",
        cell: (info) => {
          const maxAmount = info.row.original.maxAmount;
          const donatedAmount = info.row.original.donatedAmount;
          const progress = (donatedAmount / maxAmount) * 100;
          return (
            <div className="flex items-center justify-center w-full">
              <div className="w-3/4 bg-secondary rounded-full h-2 md:h-4 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{`${progress.toFixed(1)}%`}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "active",
        header: "Status",
        cell: (info) => {
          return (
            <div className="text-sm">
              {info.row.original.active ? (
                <h2 className="text-green-500 text-xs px-1 md:text-sm font-medium py-[1px] bg-green-100 rounded-full">
                  Active
                </h2>
              ) : (
                <h2 className="text-red-500 text-xs px-1 md:text-sm font-medium py-[1px] bg-red-100 rounded-full">
                  Paused
                </h2>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
        cell: (info) => (
          <div className="grid grid-cols-3  justify-items-center">
            {info.row.original.active ? (
              <Button
                onClick={() => handlePause(info.row.original)}
                variant="secondary"
                className='md:text-sm text-xs h-max'
              >
                Pause
              </Button>
            ) : (
              <Button
                onClick={() => handleResume(info.row.original)}
                className='md:text-sm text-xs h-max'
              >
                Resume
              </Button>
            )}
            <Button
              onClick={() => handleEdit(info.row.original)}
              variant="secondary"
             className='md:text-sm text-xs h-max'
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setDonateCampId(info.row.original._id), setIsOpenDonators(true);
              }}
              variant="secondary"
              className='md:text-sm text-xs h-max'
            >
              Donators
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: campaigns,
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
      <h1 className="text-lg md:text-2xl font-bold  ">
        My Campaigns - {campaigns?.length}
      </h1>
      <p className="mb-4 text-xs md:text-sm opacity-70 pt-1">
        Effortlessly manage all your campaigns in one place.
      </p>

      <section className="w-full ">
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
          ) : campaigns.length < 1 ? (
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
        </div>
        {isLoading ? (
          ""
        ) : campaigns.length < 11 ? (
          ""
        ) : (
          <div className="py-3 flex justify-center ">
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
      <AlertDialog open={isOpenResume} onOpenChange={setIsOpenResume}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to resume it? This action will active your
              Campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenResume(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={spin} onClick={handleContinueResume}>
              {spin && <ImSpinner3 className="animate-spin" />}Resume
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to pause it? This action will pause your
              Campaign.
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
              {spin && <ImSpinner3 className="animate-spin" />}Pause
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpenDonators} onOpenChange={setIsOpenDonators}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All Donators</DialogTitle>
            <DialogDescription>
              These generous contributors supported your campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="  flex items-center justify-center ">
            {donatorLoad ? (
              <div className="py-10">
                <BarLoader color="#F9802D" />
              </div>
            ) : donators.length < 1 ? (
              <div className="py-10">no contributions yet!</div>
            ) : (
              <div className="w-full">
                <div className="flex justify-between px-5 text-sm font-bold bg-primary/10 py-2">
                  <h2>Photo</h2>
                  <h2>Name</h2>
                  <h2>Donated</h2>
                </div>

                <div className="max-h-96 min-h-44 overflow-y-auto donation-container">
                  {donators.map((payUser) => (
                    <div
                      className="flex justify-between bg-primary/5 border-b py-2 px-5"
                      key={payUser._id}
                    >
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={payUser.userPhoto}
                        alt=""
                      />
                      <h2 className="text-sm font-medium">
                        {payUser.userName}
                      </h2>
                      {!payUser.refund && (
                        <h2 className="text-sm text-primary font-medium">
                          ${payUser.donatedAmount / 100}
                        </h2>
                      )}
                      {payUser.refund && (
                        <h2 className="text-sm text-primary font-medium line-through">
                          ${payUser.donatedAmount / 100}
                        </h2>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCampaigns;

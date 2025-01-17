import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Lottie from "lottie-react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Pagination } from "@mui/material";
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


const MyCampaigns = () => {
  const { user } = useContext(AssetContext);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const axiosSecure = useAxiosSecure();
  const { data: campaigns, isLoading , refetch} = useQuery({
    queryKey: ["campaigns", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/campaign?email=${user.email}`);
      return res.data;
    },
  });

  const [campId, setcampId] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenResume, setIsOpenResume] = useState(false);
  const [spin, setSpin] = useState(false);

  const navigate = useNavigate()
  const handleEdit = async(campaign) => {
      const id = await campaign._id
      navigate(`/dashboard/update-campaign/${id}`)
  }
  
  const handlePause =(campaign) => {
     setIsOpen(true)
     setcampId(campaign._id)
  }

  const handleContinue = () => {
    setSpin(true)
    axiosSecure.patch(`/campaign-pause?email=${user.email}&id=${campId}`)
    .then(res => {
        if (res.data.modifiedCount) {
            setSpin(false)
            refetch()
            toast({
                title: "Campaign Paused Successfully!",
                description:
                  "Your campaign is successfully paused. You can resume it anytime.",
              });
        }
    })
  }

  const handleResume =(campaign) => {
    setIsOpenResume(true)
    setcampId(campaign._id)
 }
 const handleContinueResume = () => {
    setSpin(true)
    axiosSecure.patch(`/campaign-resume?email=${user.email}&id=${campId}`)
    .then(res => {
        if (res.data.modifiedCount) {
            setSpin(false)
            refetch()
            toast({
                title: "Campaign Activated!",
                description:
                  "Your campaign is successfully activated.",
              });
        }
    })
 }


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
            className="w-12 h-12 object-cover mx-auto rounded-full"
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
              <div className="w-3/4 bg-secondary rounded-full h-4 overflow-hidden">
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
        accessorKey: "actions",
        header: "Actions",
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
        cell: (info) => (
          <div className="grid grid-cols-3  justify-items-center">
             {info.row.original.active ? <Button onClick={() => handlePause(info.row.original)} variant="secondary" className="w-2/3">
              Pause
            </Button> : <Button onClick={() => handleResume(info.row.original)}  className="w-2/3">
              Resume
            </Button>
             
             }
            <Button
              onClick={() => handleEdit(info.row.original)}
              variant="secondary"
              className="w-2/3"
            >
              Edit
            </Button>
            <Button variant="secondary" className="w-2/3">View Donators</Button>
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
    <div className="pt-2">
      <h1 className="text-2xl font-bold ">My Campaigns</h1>
      <p className="mb-4 text-sm opacity-70 pt-1">
        Effortlessly manage all your campaigns in one place.
      </p>
      <div>

        {
        isLoading ?  <div className="flex flex-col w-full gap-3">
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        <Skeleton className='w-full h-14'></Skeleton>
        
        </div> :
         campaigns.length < 1 ? <div className="w-full justify-center flex items-center pt-10"><Lottie className="w-96" animationData={noResule}></Lottie></div> : <div className="overflow-x-auto">
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
        }
        
      </div>
      {isLoading ? (
        ""
      ) : campaigns.length < 11 ? (
        ""
      ) : (
        <div className="py-3 flex  justify-center bg-primary-foreground/50">
          <Pagination
            count={table.getPageCount()}
            page={table.getState().pagination.pageIndex + 1}
            onChange={handlePageChange}
          />
        </div>
      )}
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
            <AlertDialogAction  disabled={spin} onClick={handleContinueResume}>
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
            <AlertDialogAction className='bg-red-600 hover:bg-red-500' disabled={spin} onClick={handleContinue}>
              {spin && <ImSpinner3 className="animate-spin" />}Pause
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyCampaigns;

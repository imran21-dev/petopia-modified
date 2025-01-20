import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { useContext, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import noResule from "../assets/noresult.json";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
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
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import moment from "moment";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AssetContext);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const {
    data: donations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donations?email=${user.email}`);
      return res.data;
    },
  });

  const [donationId, setDonationId] = useState(null);
  const [campaignId, setCampaignId] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const handleRefund = (donation) => {
    setDonationId(donation._id);
    setCampaignId(donation.campaignId);
    setDonationAmount(donation.donatedAmount / 100);
    setIsOpen(true);
  };
  const handleContinue = () => {
    setSpin(true);
    axiosSecure
      .patch(
        `/refund?id=${donationId}&campId=${campaignId}&amount=${donationAmount}&email=${user.email}`
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          setSpin(false);
          toast({
            title: "Your Donation Refunded Successfully!",
            description: "Your donation is successfully refunded.",
          });
        }else{
            setSpin(false)
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
        accessorKey: "donatedAmount",
        header: "Donated Amount $",
        cell: (info) => {
          return <h1>$ {info.row.original.donatedAmount / 100}</h1>;
        },
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
      },
      {
        accessorKey: "date",
        header: "Date",
        cell : (info) => {
         return <h2>{moment(info.row.original.date).format("LLL")}</h2>
        }
      },
      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
        cell: (info) => (
          <div className="">
            {info.row.original.refund ? (
              <Button disabled variant="secondary" className="w-2/3">
                Refunded
              </Button>
            ) : (
              <Button
              variant="secondary"
                onClick={() => handleRefund(info.row.original)}
                className="w-2/3"
              >
                Refund
              </Button>
            )}
          </div>
        ),
      },
    ],
    []
  );
  const table = useReactTable({
    data: donations,
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
      <h1 className="text-2xl font-bold ">My Donations - {donations?.length}</h1>
      <p className="mb-4 text-sm opacity-70 pt-1">
        Your Giving Journey at a Glance.
      </p>
      {
      isLoading? <div className="flex flex-col w-full gap-3">
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
    </div> : 
    donations.length < 1 ? 
    <div className="w-full justify-center flex items-center pt-10">
            <Lottie className="w-96" animationData={noResule}></Lottie>
          </div>
    :

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
      }
      {isLoading ? (
        ""
      ) : donations.length < 11 ? (
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want refund your donation? This action will
              refund your donation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={spin} onClick={handleContinue}>
              {spin && <ImSpinner3 className="animate-spin" />}Yes, Refund
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyDonations;

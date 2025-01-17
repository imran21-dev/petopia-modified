import { AssetContext } from "@/auth/ContextApi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Lottie from "lottie-react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Pagination } from "@mui/material";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    getPaginationRowModel,
  } from "@tanstack/react-table";

const MyCampaigns = () => {
 
    const {user} = useContext(AssetContext)
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const axiosSecure = useAxiosSecure()
    const {data: campaigns, isLoading} = useQuery({
        queryKey: ['campaigns', user],
        queryFn: async ()=> {
            const res = await axiosSecure.get(`/campaign?email=${user.email}`)
            return res.data
        }
    })

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
                return (
                    <h1>$ {info.row.original.maxAmount}</h1>
                )
            }
          },
          {
            accessorKey: "donatedAmount",
            header: "Donation Progress",
            cell: (info) => {
                const maxAmount = info.row.original.maxAmount;
                const donatedAmount = info.row.original.donatedAmount;
                const progress = (donatedAmount / maxAmount) * 100
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
                )
            }
          },
          {
            accessorKey: "actions",
            header: "Actions",
            enableSorting: true,
            sortingFn: (rowA, rowB) => rowA.index - rowB.index,
            cell: (info) => (
              <div className="grid grid-cols-3 justify-items-center">
               
    
           
    
                <Button variant='secondary' className='w-2/3'>
                  Pause
                </Button>
                <Button variant='secondary' className='w-2/3'>
                  Edit
                </Button>
                <Button variant='secondary' className='w-2/3'>
                View  Donators
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
console.log(campaigns)

    return (
        <div className="pt-2">
        <h1 className="text-2xl font-bold ">My Campaigns</h1>
        <p className="mb-4 text-sm opacity-70 pt-1">
        Effortlessly manage all your campaigns in one place.</p>
        <div>
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
        </div>
    );
};

export default MyCampaigns;
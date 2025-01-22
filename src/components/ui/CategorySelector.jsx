import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CgClose } from "react-icons/cg";
import { ImSpinner3 } from "react-icons/im";


const CategorySelector = ({setSelectedCategory,setKeyword,selectedCategory,setDemoLoad,demoLoad}) => {
    const axiosPublic = useAxiosPublic()
    const {data: category, isLoading} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })

    const handleCategoryChange = (value) => {
        setSelectedCategory(value)
        setKeyword('')
        setDemoLoad(demoLoad + 1)
    }
   const handleReset = () => {
    setSelectedCategory('')
   }
    return (
        <div className="flex  items-center gap-3">
             <button className={`opacity-0 duration-150 hover:bg-secondary p-2 rounded-full ${selectedCategory && 'opacity-100'}` } onClick={handleReset}>
              <CgClose />
            </button>
            <Select value={selectedCategory}  onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-40 md:w-[280px]  text-xs md:text-sm">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
       
        <SelectGroup>
          <SelectLabel className='text-xs md:text-sm'>Select a category</SelectLabel>
           {
           isLoading ? <ImSpinner3 className="animate-spin mx-auto my-10"/> : category?.map((category, idx) => <SelectItem className='text-xs md:text-sm' value={category.category} key={idx}>{category.category}</SelectItem>)
           }
          
        </SelectGroup>
    
      </SelectContent>
    </Select>
        </div>
    );
};

export default CategorySelector;
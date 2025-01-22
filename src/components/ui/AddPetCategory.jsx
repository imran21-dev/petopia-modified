import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner3 } from "react-icons/im";

const AddPetCategory = ({
  setSelectedCategory,
  selectedCategory,
  
}) => {
  const axiosPublic = useAxiosPublic()
  const { data: category, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get('/category')
      return res.data
    },
  });

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="flex  items-center gap-3">
      <Select
      
        value={selectedCategory}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="text-xs md:text-sm w-max h-max">
          <SelectValue className="" placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className='text-xs md:text-sm'>Select a category</SelectLabel>
            {isLoading ? (
              <ImSpinner3 className="animate-spin mx-auto my-10" />
            ) : (
              category?.map((category, idx) => (
                <SelectItem className='text-xs md:text-sm ' value={category.category} key={idx}>
                  {category.category}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
   
    </div>
  );
};

export default AddPetCategory;

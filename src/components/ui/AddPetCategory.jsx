import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner3 } from "react-icons/im";

const AddPetCategory = ({
  setSelectedCategory,
  selectedCategory,
  
}) => {
  const { data: category, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("/category.json");
      return res.json();
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
        <SelectTrigger className="">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a category</SelectLabel>
            {isLoading ? (
              <ImSpinner3 className="animate-spin mx-auto my-10" />
            ) : (
              category?.map((category, idx) => (
                <SelectItem value={category.category} key={idx}>
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

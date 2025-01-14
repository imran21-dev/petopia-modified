import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import { CgClose } from "react-icons/cg";


const CategorySelector = ({setSelectedCategory,setKeyword,selectedCategory,setDemoLoad,demoLoad}) => {
    
    const {data: category, isLoading} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('./category.json')
            return res.json()
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
        <div className="flex items-center gap-3">
             <button className={`opacity-0 duration-150 hover:bg-secondary p-2 rounded-full ${selectedCategory && 'opacity-100'}` } onClick={handleReset}>
              <CgClose />
            </button>
            <Select value={selectedCategory}  onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
       
        <SelectGroup>
          <SelectLabel>Select a category</SelectLabel>
           {
           !isLoading && category.map((category, idx) => <SelectItem value={category.category} key={idx}>{category.category}</SelectItem>)
           }
          
        </SelectGroup>
    
      </SelectContent>
    </Select>
        </div>
    );
};

export default CategorySelector;
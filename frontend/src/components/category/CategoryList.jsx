import Card from "./Card"
import { useState, useEffect } from "react";
import { fetchCategories } from "../../services/api/categoryApi";

const CategoryList = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.data.data);
      console.log(response.data.data)
    };
    getCategories();
  }, []);

  return (
    <div className='mt-7'>
        <h3 className="text-xl md:text-2xl text-gray-500">Explore Categories</h3>
       <div className="flex flex-col md:flex-row gap-2">
       {categories && categories.map((category) => (
            <Card key={category._id} category={category} />
        ))}
       </div>
    </div>
  )
}

export default CategoryList

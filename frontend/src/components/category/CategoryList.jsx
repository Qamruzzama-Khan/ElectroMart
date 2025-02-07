import Card from "./Card"
import { category_list } from "../../assets/assets"

const CategoryList = () => {

  return (
    <div className='mt-7'>
        <h3 className="text-xl md:text-2xl text-gray-500">Explore Categories</h3>
       <div className="flex flex-col md:flex-row gap-2">
       {category_list.map((category, index) => (
            <Card key={index} category={category} />
        ))}
       </div>
    </div>
  )
}

export default CategoryList

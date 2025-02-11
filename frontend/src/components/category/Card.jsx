import { Link } from "react-router-dom"

const Card = ({category}) => {

  return (
    <Link to={`/products/${category.name}`} className="rounded-lg overflow-hidden shadow-lg h-36 md:h-[200px] flex flex md:flex-col p-2 w-full mt-4 items-center cursor-pointer border border-gray-200">
    <p className='w-full text-xl md:text-2xl text-gray-400'>{category.name}</p>
<img className="w-full h-full object-contain" src={category.image} alt="category-image" />
</Link>
  )
}

export default Card

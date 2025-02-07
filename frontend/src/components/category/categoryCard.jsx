import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-36 md:h-[200px] flex flex md:flex-col p-2 w-full mt-4 items-center cursor-pointer border border-gray-200">
        <p className='w-full text-xl md:text-2xl text-gray-400'>{category.name}</p>
    <img className="w-full h-full object-contain" src={category.image} alt="category-image" />
  </div>
  )
}

export default CategoryCard

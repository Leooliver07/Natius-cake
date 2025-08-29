"use client"

interface SubMenuProps {
  selectedCategory: string;
  onSelectedCategory: (category: string) => void;
}

const categories = ['Bolo', 'Bebida', 'Outro'];


export function SubMenu({selectedCategory, onSelectedCategory}: SubMenuProps){

  return(
    <main>
     <div className=" bg-pink-100 h-8 w-2xl mx-auto flex items-center justify-center rounded-b-lg relative">
      <ul className="flex gap-5">
        {categories.map((category) => ( 
          <li key={category} 
          onClick={() => onSelectedCategory(category)} 
          className={`cursor-pointer hover:font-medium hover:scale-105 transition-all duration-300 ${selectedCategory === category
            ? 'font-bold underline'
            : ''
          }`}
          > 

            {category} 
          </li> 
        ))}
      </ul>
    </div>
    </main>
  )
}


export function SubMenu(){

  return(
    <main>
     <div className="w-full bg-pink-100 h-8 max-w-7xl mx-auto flex items-center justify-center rounded">
      <ul className="flex gap-5">
        <li className="cursor-pointer hover:font-medium hover:scale-105 transition-all duration-200">Item 1</li>
        <li className="cursor-pointer">Item 2</li>
        <li className="cursor-pointer">Item 3</li>
      </ul>
    </div>
    </main>
  )
}
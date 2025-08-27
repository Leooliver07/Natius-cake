

export function SubMenu(){

  return(
    <main>
     <div className="w-full bg-pink-100 h-8 max-w-7xl mx-auto flex items-center justify-center rounded">
      <ul className="flex gap-5">
        <li className="cursor-pointer hover:font-medium hover:scale-105 transition-all duration-200">Bolos</li>
        <li className="cursor-pointer"> Bebidas</li>
        <li className="cursor-pointer">Outros</li>
      </ul>
    </div>
    </main>
  )
}
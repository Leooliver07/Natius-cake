

export function Card(){


  return (

    <div className="flex gap-6">
    <div className="h-20 bg-red-200 w-48 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 transition-all duration-200">
      <p>Bolo de Cenoura</p>
    </div>
    <div className="h-20 bg-red-200 w-48 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 transition-all duration-200">
      <p>Bolo de mandioca</p>
    </div>
    <div className="h-20 bg-red-200 w-48 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 transition-all duration-200">
      <p className="font-medium text-xl">Bolo de milho</p>
    </div>
    </div>
  )
}
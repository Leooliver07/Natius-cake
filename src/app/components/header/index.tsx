import { headers } from "next/headers";


export function Header(){

  return(
    <main className="mx-auto flex items-center justify-center">
      <header className="w-full max-w-7xl h-14 flex justify-between px-4 py-4 bg-gray-200 rounded">
        <div>
          <h1>NatiusCake</h1>
        </div>
        <p>Login</p>
      </header>

    </main>
      
  )
}
import { ReactNode } from "react"
export function Container({children}:{children: ReactNode} ){

  return(
    <div className="max-w-7xl px-2 mx-auto w-full flex items-center justify-center">
      {children}
    </div>
  )
}
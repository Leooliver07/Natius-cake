"use client"
import {Home, Inbox, Search, Settings, User } from "lucide-react"
import Link from "next/link"
import { useUI } from "@/context/UIContext"
import { MdDashboard } from "react-icons/md"

const navItems = [
  {href:'/', icon: Home, title: 'Home'},
  {href:'/register', icon: Search, title: 'Cadastro de Produtos'},
  {href:'/order', icon: Inbox, title: 'Pedidos'},
  {href:'/profile', icon: User, title: 'Perfil'},
  {href:'/dashboard', icon: MdDashboard, title: "Dashboard"},
]


export function AppSidebar() {

  const { isSidebarOpen, closeSidebar } = useUI();


  return (

    <>
      <div
        onClick={closeSidebar} // Ao clicar no overlay, a sidebar fecha
        className={`fixed inset-0 transition-opacity
          ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
        }
      />
        
     <aside className={`
        fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}` // Animação de entrada/saída
      }>
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        <nav className="flex-1 px-2 py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.title}>
                <Link href={item.href} onClick={closeSidebar} className="flex items-center p-2 my-1 rounded-lg text-gray-700 hover:bg-pink-100 transition-colors">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    
    </>

          
  )
}
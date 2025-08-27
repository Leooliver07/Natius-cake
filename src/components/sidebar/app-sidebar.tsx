
import {Home, Inbox, Search, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { url } from "inspector"
import { title } from "process"

import { MdDashboard } from "react-icons/md"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cadastro de produtos",
    url: "/register",
    icon: Inbox,
  },
  
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title:"Conta",
    url: "#",
    icon: User,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: MdDashboard,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Menu</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {items.map((item)=>  (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
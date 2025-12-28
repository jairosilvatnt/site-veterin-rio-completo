import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import {
  Home,
  Calendar,
  Users,
  Tractor,
  PawPrint,
  FileText,
  Pill,
  BarChart3,
  Search,
  Plus,
  Bell,
  Settings,
  User,
  LogOut,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { icon: Home, label: 'Início', href: '/' },
  { icon: Calendar, label: 'Agenda', href: '/agenda' },
  { icon: Users, label: 'Clientes', href: '/clientes' },
  { icon: Tractor, label: 'Fazendas', href: '/clientes?tab=fazendas' }, // Sharing page for simplicity
  { icon: PawPrint, label: 'Animais', href: '/animais' },
  { icon: FileText, label: 'Atendimentos', href: '/atendimentos' },
  { icon: FileText, label: 'Orçamentos', href: '/orcamentos' },
  { icon: Pill, label: 'Medicamentos', href: '/medicamentos' },
  { icon: BarChart3, label: 'Relatórios', href: '/relatorios' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                V
              </div>
              <span className="font-bold text-lg tracking-tight truncate group-data-[collapsible=icon]:hidden">
                VetManager
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          location.pathname === item.href ||
                          (item.href !== '/' &&
                            location.pathname.startsWith(item.href))
                        }
                        tooltip={item.label}
                      >
                        <Link
                          to={item.href}
                          className="flex items-center gap-3"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src="https://img.usecurling.com/ppl/thumbnail?gender=male"
                          alt="Dr. User"
                        />
                        <AvatarFallback className="rounded-lg">
                          DR
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          Dr. Veterinário
                        </span>
                        <span className="truncate text-xs">admin@vet.com</span>
                      </div>
                      <Settings className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src="https://img.usecurling.com/ppl/thumbnail?gender=male"
                            alt="Dr. User"
                          />
                          <AvatarFallback className="rounded-lg">
                            DR
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            Dr. Veterinário
                          </span>
                          <span className="truncate text-xs">
                            admin@vet.com
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
            <div className="flex items-center gap-2 px-0 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              <div className="flex-1 flex items-center gap-4">
                <div className="relative w-full max-w-sm hidden md:flex items-center">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar animais, clientes, atendimentos..."
                    className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex gap-1 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Novo</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Novo Atendimento</DropdownMenuItem>
                    <DropdownMenuItem>Novo Animal</DropdownMenuItem>
                    <DropdownMenuItem>Novo Cliente</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </main>
          <footer className="border-t py-4 px-6 text-xs text-muted-foreground flex justify-between items-center bg-background/50">
            <span>VetManager v0.0.1</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Activity,
  BarChart3,
  Database,
  FileText,
  Globe,
  Heart,
  Home,
  Wallet,
  History,
  Users,
  Settings,
  Star,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const mainMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Markets", icon: BarChart3, url: "/markets" },
  { title: "Model Schema", icon: Database, url: "/schema" },
];

const lendingItems = [
  { title: "Borrow", icon: CreditCard, url: "/borrow" },
  { title: "Supply", icon: Wallet, url: "/supply" },
  { title: "Repay", icon: Activity, url: "/repay" },
];

const aiItems = [
  { title: "AI Credit Scoring", icon: Star, url: "/credit-scoring" },
  { title: "KYC & Documents", icon: FileText, url: "/kyc" },
  { title: "Risk Analysis", icon: Activity, url: "/risk-analysis" },
];

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));
  
  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    cn("flex items-center py-2 px-3 rounded-lg transition-colors", 
      isActive 
        ? "bg-aave-accent/10 text-aave-accent font-medium" 
        : "text-gray-300 hover:bg-aave-blue-gray hover:text-white"
    );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        className={cn(
          "border-r border-aave-light-blue transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn("flex items-center p-4", collapsed ? "justify-center" : "")}>
          {!collapsed ? (
            <div className="font-bold text-xl aave-gradient">AaveAI</div>
          ) : (
            <div className="h-8 w-8 bg-gradient-to-br from-aave-primary to-aave-secondary rounded-full"></div>
          )}
          <SidebarTrigger className="ml-auto text-gray-400 hover:text-white" />
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={cn("text-gray-400 text-xs", collapsed && "sr-only")}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavClass}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={cn("text-gray-400 text-xs", collapsed && "sr-only")}>
              Lending
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {lendingItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavClass}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={cn("text-gray-400 text-xs", collapsed && "sr-only")}>
              AI Credit System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {aiItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavClass}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;

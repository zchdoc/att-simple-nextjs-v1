"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  Moon, 
  Sun, 
  UserCircle, 
  Settings, 
  LogOut,
  Clock,
  CalendarDays,
  ChevronRight,
  Users,
  Building,
  BarChart,
  Plus,
  Laptop,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavGroup } from "./nav-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SidebarContent onNavigate={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <aside className="hidden lg:flex w-[300px] flex-col border-r">
        <SidebarContent onNavigate={() => {}} />
      </aside>
    </>
  );
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('auth_key');
    window.location.reload();
    toast.success('Logged out successfully');
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    onNavigate();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Workspace 1</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              Workspace 1
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              Workspace 2
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Add Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <NavGroup
          title="Attendance"
          icon={Clock}
          items={[
            {
              title: "Manual Check-in",
              icon: Clock,
              onClick: () => handleNavigation("/check-in"),
              active: pathname === "/check-in",
            },
            {
              title: "History",
              icon: CalendarDays,
              onClick: () => handleNavigation("/history"),
              active: pathname === "/history",
            },
          ]}
        />
        <Separator className="my-4" />
        <NavGroup
          title="Management"
          icon={Users}
          items={[
            {
              title: "Employees",
              icon: Users,
              onClick: () => {},
            },
            {
              title: "Departments",
              icon: Building,
              onClick: () => {},
            },
            {
              title: "Reports",
              icon: BarChart,
              onClick: () => {},
            },
          ]}
        />
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 border-t space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCircle className="h-5 w-5" />
              <span>John Doe</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span className="text-sm">Dark Mode</span>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTheme('dark');
                    } else {
                      setTheme('light');
                    }
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <Laptop className="inline h-3 w-3 mr-1" />
                System theme: {theme === 'system' ? 'Active' : 'Inactive'}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
}

interface NavGroupProps {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

export function NavGroup({ title, icon: Icon, items }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="h-5 w-5" />
        <span>{title}</span>
        <ChevronRight
          className={cn("ml-auto h-4 w-4 transition-transform", {
            "transform rotate-90": isOpen,
          })}
        />
      </Button>
      {isOpen && (
        <div className="pl-6 space-y-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={item.onClick}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/index.store";
import { ChevronDownIcon } from "lucide-react";

import { NavItem } from "@/types/nav-item.type";
import { cn } from "@/lib/cva.lib";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion/accordion-side";
import { buttonVariants } from "@/components/atoms/button/button";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const location = useLocation();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline",
                )}
              >
                <div>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
                <div
                  className={cn(
                    "absolute left-12 text-base duration-200",
                    !isOpen && className,
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 space-y-2 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    to={child.href}
                    onClick={() => {
                      if (setOpen && isOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex h-12 justify-start gap-x-3",
                      location.pathname === child.href &&
                        "bg-muted font-bold hover:bg-muted",
                    )}
                  >
                    {/* Use child.icon aqui em vez de item.icon */}
                    <child.icon className={cn("h-5 w-5", child.color)} />
                    <div
                      className={cn(
                        "text-base duration-200",
                        !isOpen && className,
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            to={item.href}
            onClick={() => {
              if (setOpen && isOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start",
              location.pathname === item.href &&
                "bg-muted font-bold hover:bg-muted",
            )}
          >
            <item.icon className={cn("h-5 w-5", item.color)} />
            <span
              className={cn(
                "absolute left-12 text-base duration-200",
                !isOpen && className,
              )}
            >
              {item.title}
            </span>
          </Link>
        ),
      )}
    </nav>
  );
}

import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModeToggle from "./modeToggle";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button variant="ghost" render={<Link href="/cart" />}>
          <ShoppingCart />
          Cart
        </Button>
        <Button render={<Link href="/sign-in" />}>
          <UserIcon />
          Sign In
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start p-4">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button variant="ghost" render={<Link href="/cart" />}>
              <ShoppingCart />
              Cart
            </Button>
            <Button render={<Link href="/sign-in" />}>
              <UserIcon />
              Sign In
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;

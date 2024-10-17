import Link from "next/link";
import { Home, ShoppingCart, Package, Users, LineChart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { CardContent  } from "@/components/ui/card";

const Navbar = ({ toggleDarkMode }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col w-64 p-4">
          <nav className="grid gap-3">
            <Link href="/dashboard/inventory1" className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Home className="h-4 w-4" /> Inventario 1
            </Link>
            <Link href="/dashboard/inventory2" className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <ShoppingCart className="h-4 w-4" /> Inventario 2
            </Link>
            <Link href="/dashboard/inventory3" className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Package className="h-4 w-4" /> Inventario 
            </Link>
            {/* <Link href="/dashboard/inventory4" className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Users className="h-4 w-4" /> Inventario 4
            </Link>
            <Link href="/dashboard/inventory5" className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LineChart className="h-4 w-4" /> Inventario 5
            </Link> */}
            <div className="mt-auto p-4">
        </div>
          </nav>
        </SheetContent>
      </Sheet>

    </header>
  );
};

export default Navbar;

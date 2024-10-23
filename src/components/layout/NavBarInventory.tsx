import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface NavbarInventoryProps {
  title: string;  // Definimos la prop title
}

const NavbarInventory: React.FC<NavbarInventoryProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
        {title}
      </h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount
          className="w-56 align-end forceMount bg-black text-white dark:bg-white dark:text-black"

        >
          <DropdownMenuItem
            onClick={async () => await signOut({ callbackUrl: "/" })}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarInventory;

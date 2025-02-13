import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewPostDialog } from "./new-post-dialog";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-800 text-xl">
            Plataforma Comunitaria
          </Link>
          <div className="flex items-center space-x-4">
            <NewPostDialog>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Publicar
              </Button>
            </NewPostDialog>
            <Link href="/search" className="text-gray-600 hover:text-gray-800">
              Buscar
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-800 text-xl">
            Plataforma Comunitaria
          </Link>
          <div className="flex items-center">
            <Link
              href="/publish"
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              Publicar
            </Link>
            <Link
              href="/search"
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              Buscar
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("q", query);
    if (category) searchParams.set("category", category);
    router.push(`/search?${searchParams.toString()}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filtrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar publicaciones</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFilter} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Buscar</Label>
            <Input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar publicaciones..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="producto">Producto</SelectItem>
                <SelectItem value="servicio">Servicio</SelectItem>
                <SelectItem value="pregunta">Pregunta</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Aplicar filtros
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

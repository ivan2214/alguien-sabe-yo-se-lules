"use client";

import { createNewReport } from "@/actions/reports";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Flag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReportDialogProps {
  postId: string;
}

export function ReportDialog({ postId }: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Debe iniciar sesión para reportar");
      return;
    }
    setIsLoading(true);
    try {
      const { error, ok, report, success } = await createNewReport(
        { reason, description, authorId: user.id },
        postId
      );
      if (ok) {
        toast.success("Reporte enviado exitosamente");
        setIsOpen(false);
      } else {
        toast.error("Error al enviar el reporte");
      }
    } catch (error) {
      toast.error("Error al enviar el reporte");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setDescription("");
      setReason("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Flag className="mr-2 h-4 w-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar publicación</DialogTitle>
          <DialogDescription>
            Por favor, indique el motivo del reporte y proporcione detalles
            adicionales.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="inappropriate">
                  Contenido inapropiado
                </SelectItem>
                <SelectItem value="offensive">Contenido ofensivo</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Proporcione más detalles sobre el reporte"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Enviando..." : "Enviar reporte"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

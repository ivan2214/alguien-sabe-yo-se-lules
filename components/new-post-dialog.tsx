"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";

export function NewPostDialog({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { user } = useUser();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) {
			toast.error("Debe iniciar sesión para publicar");
			return;
		}
		setIsLoading(true);
		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					content,
					category,
					isAnonymous,
					images,
					authorId: user.id,
				}),
			});
			if (response.ok) {
				toast.success("Publicación creada exitosamente");
				setOpen(false);
				router.refresh();
				resetForm();
			} else {
				throw new Error("Error al crear la publicación");
			}
		} catch (error) {
			toast.error("Error al crear la publicación");
		} finally {
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		setTitle("");
		setContent("");
		setCategory("");
		setIsAnonymous(false);
		setImages([]);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nueva Publicación</DialogTitle>
					<DialogDescription>
						Crea una nueva publicación para compartir con la comunidad.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Título</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							placeholder="Ingrese el título de su publicación"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Contenido</Label>
						<Textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							placeholder="Describa su publicación"
							className="min-h-[100px]"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="category">Categoría</Label>
						<Select value={category} onValueChange={setCategory} required>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una categoría" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="producto">Producto</SelectItem>
								<SelectItem value="servicio">Servicio</SelectItem>
								<SelectItem value="pregunta">Pregunta</SelectItem>
								<SelectItem value="otro">Otro</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Imágenes (máximo 3)</Label>
						<ImageUpload value={images} onChange={setImages} maxImages={3} />
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="anonymous"
							checked={isAnonymous}
							onCheckedChange={setIsAnonymous}
						/>
						<Label htmlFor="anonymous">Publicar de forma anónima</Label>
					</div>
					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? "Publicando..." : "Publicar"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

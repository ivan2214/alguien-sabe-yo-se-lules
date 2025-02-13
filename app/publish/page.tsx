import { Header } from "@/components/header";
import { PublicationForm } from "@/components/publication-form";

export default function Publish() {
  return (
    <section className="container mx-auto px-6 py-8">
      <h1 className="mb-6 font-bold text-3xl">Crear Nueva Publicación</h1>
      <PublicationForm />
    </section>
  );
}

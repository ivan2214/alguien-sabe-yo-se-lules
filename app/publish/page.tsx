import { Header } from "@/components/header";
import { PublicationForm } from "@/components/publication-form";

export default function Publish() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Crear Nueva Publicación</h1>
        <PublicationForm />
      </main>
    </div>
  );
}

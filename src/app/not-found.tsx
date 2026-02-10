import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          <div className="font-heading text-8xl font-bold text-flame/20">
            404
          </div>
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            Page introuvable
          </h1>
          <p className="text-text-muted max-w-md mx-auto">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="flame" href="/">
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

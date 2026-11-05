import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function WBudowie() {
  return (
    <div className="min-h-screen bg-black pb-12 relative overflow-hidden">
      <Navbar />
      <div className="flex h-screen items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white">
              Strona w budowie
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-4">
            Pracujemy nad tą częścią serwisu. Zapraszamy wkrótce!
          </p>
          <Link href="/" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block">Strona główna</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
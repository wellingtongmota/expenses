import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-[100dvh] flex-wrap items-center justify-evenly gap-8">
      <div className="flex w-full flex-col gap-1 p-4 sm:max-w-sm">
        <h1 className="text-4xl font-bold">Página não encontrada...</h1>
        <h3 className="mt-1">
          Parece que a página que você está procurando foi movida ou nunca
          existiu. Certifique-se que digitou o endereço corretamente ou seguiu
          um link válido.
        </h3>

        <Button asChild className="mt-12 uppercase" size="lg">
          <Link href="/">Ir para a Home</Link>
        </Button>
      </div>

      <div className="w-full max-w-4xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/error_404.svg"
          alt="Imagem erro 404"
          className="max-h-screen w-full p-4"
        />
      </div>
    </div>
  )
}

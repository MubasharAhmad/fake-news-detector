import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container">
      <div className="mb-12 mt-28 sm:mt-40 max-w-screen-xl flex flex-col items-center justify-center text-center">
        <div className="mb-4 overflow-hidden whitespace-nowrap rounded-full border border-gray-200 px-7 py-2 bg-white shadow-md backdrop-blur hover:border-gray-300 hover:bg-white/50 transition-all">
          <p className="text-sm font-semibold text-gray-700">
            Combat Misinformation
          </p>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
          Empowering Truth in News - Detecting <span className="text-primary">False Information</span> Effortlessly
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Uncover the truth amidst the noise. Our Fake News Detector, swiftly identifies misinformation from Israeli and American sources. Trust clarity in an era of ambiguity.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5"
          })}
          href='/news'
          target="_blank">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}

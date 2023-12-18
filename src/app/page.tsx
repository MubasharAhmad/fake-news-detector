import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-20 overflow-hidden">
      <div className="mb-12 sm:mt-40 max-w-screen-xl flex flex-col items-center justify-center text-center">
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-md py-10 shadow-md mt-16">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-primary">1.5M+</p>
          <p className="text-xl font-semibold text-gray-700">News Articles</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-primary">100+</p>
          <p className="text-xl font-semibold text-gray-700">News Sources</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-primary">1M+</p>
          <p className="text-xl font-semibold text-gray-700">Unique Visitors</p>
        </div>
      </div>

      <div className="mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-zinc-700 sm:text-5xl sm:tracking-tight lg:text-6xl">How it works</p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Our Fake News Detector is a powerful tool that allows you to detect misinformation in news articles about <span className="text-primary">Israel and Palestine WAR</span>. It is a simple and easy to use tool that can be used by anyone.</p>
          </div>
        </div>
        <div className="mt-16 bg-white py-10 shadow-md rounded-md">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <dl className="mt-2 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div>
                  <dt className="text-2xl font-semibold text-primary">1. Enter a Title</dt>
                  <dd className="mt-2 text-base text-gray-500">Enter the Title of the news article you want to check.</dd>
                </div>

                <div>
                  <dt className="text-2xl font-semibold text-primary">2. Click Check</dt>
                  <dd className="mt-2 text-base text-gray-500">Click the Check button to check the article for misinformation.</dd>
                </div>

                <div>
                  <dt className="text-2xl font-semibold text-primary">3. Get Results</dt>
                  <dd className="mt-2 text-base text-gray-500">Get the results of the check. The results will tell you if the article is true or false.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-20 relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Image src={"/fake_news.webp"} className="shadow-xl rounded-md" width={1920} height={1080} alt='fake news' />
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
              <div className="text-center py-4">
                <h2 className="text-base font-semibold text-foreground tracking-wide uppercase">Example</h2>
                <p className="mt-1 text-4xl font-extrabold text-primary sm:text-5xl sm:tracking-tight lg:text-6xl">Fake News</p>
                <p className="max-w-xl mt-5 mx-auto text-2xl text-foreground text-left">
                  IDF: Al-Shifa hospital in Gaza hit by terrorists.
                </p>
                <p className="max-w-xl mt-1 mx-auto text-sm text-foreground text-justify">
                  The facility is said the hide the key command center of Hamas
                  The Al-Shifa hospital, the biggest medical facility in the Gaza Strip, was hit on Friday. The Israel Defense Forces (IDF) stated that the attack originated from a misfire by a terrorist organization targeting the IDF troops in the vicinity of the hospital.
                  The IDF Spokesperson Avichay Adraee stated: &quot;The analysis conducted by the IDF&apos;s operational systems indicates that sabotage elements fired rockets targeting the IDF forces operating near Al-Shifa hospital in Gaza City. According to IDF systems, rocket-propelled grenades hit the hospital.&quot;
                </p>
                <div className="flex mt-3">
                  <Link href={"https://www.i24news.tv/en/news/israel-at-war/1699682043-idf-al-shifa-hospital-hit-by-terrorists-misfire"} target="_blank" className="bg-primary px-4 py-2 rounded-sm shadow-sm text-primary-foreground">
                    Visit Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

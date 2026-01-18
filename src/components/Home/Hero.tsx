"use client";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform blur-3xl">
        <div className="h-[20rem] w-[40rem] bg-orange-600/20 opacity-50 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold leading-6 text-orange-600 ring-1 ring-inset ring-orange-600/20">
              New Features Just Dropped
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Writing about what <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              matters most.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thoughts on code, design, and the future of the web. Join me on this
            journey of continuous learning.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blogs"
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-300 hover:scale-105"
            >
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900 group"
            >
              Learn more{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

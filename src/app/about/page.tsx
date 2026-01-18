"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Target, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Active Readers", value: "50K+" },
  { label: "Expert Authors", value: "200+" },
  { label: "Articles Published", value: "1.2K+" },
  { label: "Community Stars", value: "500+" },
];

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeIn} className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-orange-600 uppercase tracking-widest">About Us</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Empowering the next generation of creators.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-zinc-400">
              Blogify is more than just a platform; it's a movement to share knowledge, 
              modern skills, and practical lessons that help people grow their digital lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50/50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[
              {
                title: "Our Mission",
                desc: "To provide a seamless writing experience for everyone, from hobbyists to professionals.",
                icon: Rocket,
              },
              {
                title: "Our Vision",
                desc: "Becoming the world's most trusted source for digital life lessons and modern skill building.",
                icon: Target,
              },
              {
                title: "Our Community",
                desc: "Fostering a space where diverse voices can be heard and meaningful conversations happen.",
                icon: Users,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col rounded-2xl bg-white dark:bg-zinc-800 p-8 shadow-sm border border-gray-100 dark:border-zinc-700"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-4 text-gray-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-zinc-400">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-orange-600 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-zinc-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start your journey with Blogify today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Join thousands of others who are already sharing their stories and learning new skills.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/signup"
              className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
            >
              Get started for free
            </Link>
            <Link href="/blogs" className="text-sm font-semibold leading-6 text-white hover:text-orange-400 transition">
              Read our blog <span aria-hidden="true">→</span>
            </Link>
          </div>
          {/* Decorative background circle */}
          <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#orange-gradient)" fillOpacity="0.15" />
            <defs>
              <radialGradient id="orange-gradient">
                <stop stopColor="#ea580c" />
                <stop offset="1" stopColor="#fb923c" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </div>
  );
}
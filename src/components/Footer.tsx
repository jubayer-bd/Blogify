"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Blog", href: "/blogs" },
      { name: "Documentation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Partners", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50/50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8"
      >
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand & Description */}
          <div className="space-y-8">
            <Link
              href="/"
              className="flex gap-1 justify-start items-center text-xl font-bold text-orange-600"
            >
              <figure className="w-8 h-8 relative">
                <Image
                  className="dark:invert object-contain"
                  src="/orig.png"
                  alt="Blogify logo"
                  fill
                  priority
                />
              </figure>
              <span className="text-orange-600">Blogify</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-gray-600 dark:text-zinc-400">
              Empowering creators with modern skills and practical insights.
              Join our community and start building your digital future today.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-gray-500 hover:text-orange-600 transition-colors dark:hover:text-orange-500"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links & Newsletter */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-xl font-bold text-orange-600 leading-6 ">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm leading-6 text-gray-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className=" text-xl font-bold text-orange-600">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-zinc-400">
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm sm:leading-6"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                    >
                      <Send size={16} className="mr-2" />
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-zinc-800 sm:mt-20 lg:mt-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
            <span>Made with</span>
            <Heart size={12} className="fill-orange-600 text-orange-600" />
            <span>by the Blogify Team</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

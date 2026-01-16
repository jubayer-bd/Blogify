'use client'; // Required for Next.js App Router interactivity
import { useState } from 'react';

const faqs = [
  { q: "What tech stack do you use?", a: "I primarily use Next.js, Tailwind CSS, and TypeScript." },
  { q: "Can I use your code snippets?", a: "Absolutely! Everything here is open source unless stated otherwise." },
  { q: "Do you accept guest posts?", a: "Currently I am not accepting guest posts, but feel free to reach out." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Frequently Asked</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`border rounded-xl transition-all duration-300 ${
              openIndex === i ? 'border-orange-600/30 bg-orange-50/30' : 'border-gray-200 bg-white hover:border-orange-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className={`font-semibold ${openIndex === i ? 'text-orange-700' : 'text-gray-900'}`}>
                {faq.q}
              </span>
              <span className={`transform transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-orange-600' : 'text-gray-400'}`}>
                ▼
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
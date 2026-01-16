// Using simple SVG placeholders (replace with React Icons or SVGs for specific tools)
const tools = ["Next.js", "React", "Tailwind", "Vercel", "TypeScript", "Prisma"];

export default function TechStack() {
  return (
    <div className="py-12">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
        Built with the <span className="text-orange-600">Modern Web</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto px-4">
        {tools.map((tool) => (
          <div 
            key={tool} 
            className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-transparent hover:border-orange-600/30 hover:bg-orange-50/50 hover:shadow-lg hover:shadow-orange-600/5 transition-all duration-300"
          >
            {/* Circle Icon Container */}
            <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold text-gray-700 group-hover:text-orange-600">
                {tool[0]}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-600 group-hover:text-orange-800">
              {tool}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
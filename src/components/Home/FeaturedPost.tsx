import Link from 'next/link';

export default function FeaturedPost() {
  return (
    <div className="p-8 bg-gray-50 flex justify-center">
      <Link href="/posts/my-post" className="group relative flex flex-col w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-200" /> {/* Placeholder color */}
          {/* Replace src with your actual image */}
          <img 
            src="https://images.unsplash.com/photo-1499750310159-525446b095b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Workspace"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-orange-600 uppercase tracking-wide backdrop-blur-sm">
            Development
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-x-2 text-xs text-gray-500 mb-2">
              <time dateTime="2023-01-01">Jan 16, 2026</time>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              Why I switched to Next.js App Router
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
              The migration wasn't easy, but the performance gains were worth every headache. Here is a breakdown of what changed.
            </p>
          </div>
          
          <div className="mt-6 flex items-center gap-x-2 text-sm font-semibold text-orange-600">
            Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
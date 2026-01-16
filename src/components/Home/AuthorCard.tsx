export default function AuthorCard() {
  return (
    <div className="my-12 p-8 bg-gray-50 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden ring-4 ring-white shadow-sm">
           <img 
             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
             alt="Author" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">Hey, I'm Alex.</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          I write about building scalable web apps and the chaos of software engineering. 
          Currently working with Next.js 14 and Tailwind.
        </p>
        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
          <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline">
            @alex_dev
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-sm font-semibold text-gray-500 hover:text-gray-900">
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
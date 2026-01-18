const trending = [
  { id: 1, title: "Mastering Server Components", date: "Jan 12" },
  { id: 2, title: "Tailwind Tricks You Didn't Know", date: "Jan 08" },
  { id: 3, title: "My Journey into Open Source", date: "Dec 24" },
];

export default function TrendingWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm   max-w-7xl mx-auto">
      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-orange-600 rounded-full"></span>
        Trending Now
      </h3>
      <div className="flex flex-col gap-6">
        {trending.map((post, index) => (
          <div key={post.id} className="group relative flex items-start gap-4 cursor-pointer">
            <span className="text-4xl font-black text-orange-600/20 group-hover:text-orange-600 transition-colors duration-300 -mt-2">
              0{index + 1}
            </span>
            <div>
              <h4 className="font-medium text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
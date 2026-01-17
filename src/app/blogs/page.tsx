import { Clock, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic"; // Optional: Ensures the page updates if new posts are added

export default async function BlogListing() {
  // 1. Fetch Data on Server
  await connectDB();
  
  // .lean() makes the query faster by returning plain objects, not Mongoose Docs
  // We sort by createdAt -1 to show newest first
  const blogs = await Post.find({}).sort({ createdAt: -1 }).lean();

  // Hack: Convert _id and dates to strings if Next.js complains about passing Objects
  const serializedBlogs = blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt?.toString(),
    updatedAt: blog.updatedAt?.toString(),
  }));

  return (
    <section className="bg-gray-50 py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest from the <span className="text-orange-600">Blog</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Insights on technology, design, and everything in between.
          </p>
        </div>

        {/* Blog Grid - Removed motion.div for Server Component compatibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serializedBlogs.map((post) => (
            <article
              key={post._id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <span className="inline-block mb-3 text-xs font-semibold text-orange-600">
                    {post.category}
                  </span>

                  {/* Fix: Pass the ID to the dynamic route */}
                  <Link href={`/blogs/${post._id}`}>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>

                <Link
                  href={`/blogs/${post._id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600"
                >
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
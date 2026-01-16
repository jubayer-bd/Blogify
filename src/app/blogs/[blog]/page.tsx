'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
};

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ blog: string }>;
}) {
  // ✅ unwrap params Promise
  const { blog } = React.use(params);
  const blogId = Number(blog);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog.json')
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const found = data.find((item) => item.id === blogId);
        setPost(found ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blog:', err);
        setLoading(false);
      });
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <Link href="/blogs" className="mt-4 text-orange-600 font-semibold">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-gray-50 min-h-screen pb-24">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft size={16} />
          Back to blogs
        </Link>
      </div>

      {/* Hero */}
      <div className="relative mt-6 h-[420px] w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative -mt-24 mx-auto max-w-3xl bg-white rounded-3xl shadow-xl px-6 py-10 sm:px-10"
      >
        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-600">
          {post.category}
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User size={14} className="text-orange-600" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-orange-600" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-orange-600" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-10 text-gray-700 leading-7">
          <p>{post.excerpt}</p>
        </div>

        <div className="mt-10 flex gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-4 py-1 text-xs">
            <Tag size={12} /> Blog
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-4 py-1 text-xs">
            <Tag size={12} /> {post.category}
          </span>
        </div>
      </motion.div>
    </article>
  );
}

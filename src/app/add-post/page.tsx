"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Type,
  FileText,
  Tag,
  User,
  Clock,
  Image as ImageIcon,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";

// Define the shape of our form based on your JSON
interface PostFormData {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export default function AddPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  console.log(session?.user?.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to create a post");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...data,
      email: session.user.email,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create post");
      }

      toast.success("Post created successfully");
      reset(); // if using react-hook-form
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
      toast.success("Post creation process completed");
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-orange-600 p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <PlusCircle /> Create New Post
          </h2>
          <p className="text-orange-100 mt-2">
            Share your thoughts with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Title Field */}
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Type size={18} className="text-orange-600" /> Post Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full p-3 rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all`}
              placeholder="e.g. Digital Nomad Lifestyle"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </motion.div>

          {/* Excerpt Field */}
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText size={18} className="text-orange-600" /> Description
            </label>
            <textarea
              {...register("excerpt", { required: "Excerpt is required" })}
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
              placeholder="A brief summary of your post..."
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag size={18} className="text-orange-600" /> Category
              </label>
              <input
                {...register("category", { required: true })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none"
                placeholder="e.g. Life, Tech"
              />
            </motion.div>

            {/* Read Time */}
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock size={18} className="text-orange-600" /> Read Time
              </label>
              <input
                {...register("readTime")}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none"
                placeholder="e.g. 6 min"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={18} className="text-orange-600" /> Author Name
              </label>
              <input
                {...register("author", { required: true })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none"
                placeholder="Alex Rivers"
              />
            </motion.div>

            {/* Date (Simplified as text for demo) */}
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock size={18} className="text-orange-600" /> Date
              </label>
              <input
                {...register("date")}
                type="date"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none"
                placeholder="Nov 25, 2025"
              />
            </motion.div>
          </div>

          {/* Image URL */}
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImageIcon size={18} className="text-orange-600" /> Image URL
            </label>
            <input
              {...register("imageUrl")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="https://unsplash.com/..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:bg-orange-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Creating...
              </>
            ) : (
              "Publish Post"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

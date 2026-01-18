import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";import Post from "@/models/Post";

// Define the type for the params context
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// GET: Fetch a single post by ID
export async function GET(req: Request, props: Props) {
  try {
    const params = await props.params; // Await params for Next.js 15+ support
    const id = params.id;

    await connectDB();

    // Find the post by ID
    const post = await Post.findOne({ _id: id });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a post by ID
export async function DELETE(req: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;

    await connectDB();

    // Find and delete the post
    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "Post not found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}
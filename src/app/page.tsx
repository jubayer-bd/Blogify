import AuthorCard from "@/components/Home/AuthorCard";
import CategoryCloud from "@/components/Home/CategoryCloud";
import FAQ from "@/components/Home/FAQ";
import FeaturedPost from "@/components/Home/FeaturedPost";
import Hero from "@/components/Home/Hero";
import Newsletter from "@/components/Home/Newsletter";
import TechStack from "@/components/Home/TechStack";
import TrendingWidget from "@/components/Home/TrendingWidget";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedPost />
      <Newsletter />
      <CategoryCloud />
      <TechStack />
      <TrendingWidget />
      <AuthorCard />
      <FAQ />
    </div>
  );
}

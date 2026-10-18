import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Impelisa Travel & Tours Africa",
  description:
    "Travel stories, safari tips, and insights from Impelisa Travel & Tours Africa. Plan your next African adventure with expert guides.",
};

const categories = [
  { label: "All Posts", active: true },
  { label: "Travel Tips" },
  { label: "Destinations" },
  { label: "Safari Stories" },
  { label: "Culture" },
  { label: "News" },
];

const featuredPost = {
  title: "Top 10 Wildlife Encounters in Serengeti",
  excerpt:
    "The Serengeti is Africa's most iconic wildlife destination. From witnessing the Great Migration to spotting the elusive leopard, here are the top wildlife encounters you cannot miss.",
  date: "Oct 5, 2026",
  author: "James Mwangi",
  category: "Safari Stories",
  readTime: "8 min read",
  image: "/images/serengeti.jpg",
};

const posts = [
  {
    title: "Best Time to Visit Zanzibar",
    excerpt: "Plan your Zanzibar trip perfectly with our month-by-month weather and event guide for the island.",
    date: "Sep 28, 2026",
    author: "Amina Hassan",
    category: "Destinations",
    readTime: "5 min read",
    image: "/images/zanzibar.jpg",
  },
  {
    title: "Climbing Mount Kilimanjaro: What to Expect",
    excerpt: "Everything first-time climbers need to know – altitude, fitness, gear, and the best route for you.",
    date: "Sep 20, 2026",
    author: "David Osei",
    category: "Travel Tips",
    readTime: "10 min read",
    image: "/images/kilimanjaro.jpg",
  },
  {
    title: "Discover Tanzania's Rich Culture",
    excerpt: "From the Maasai people to Swahili architecture in Stone Town – Tanzania's cultural tapestry is breathtaking.",
    date: "Sep 12, 2026",
    author: "James Mwangi",
    category: "Culture",
    readTime: "6 min read",
    image: "/images/ngorongoro.jpg",
  },
  {
    title: "Safari Packing Checklist",
    excerpt: "Don't leave home without these essentials. Our ultimate packing guide for an African safari adventure.",
    date: "Sep 5, 2026",
    author: "Amina Hassan",
    category: "Travel Tips",
    readTime: "4 min read",
    image: "/images/safari-jeep.jpg",
  },
  {
    title: "10 Tips for a Perfect Beach Holiday",
    excerpt: "Make the most of your Zanzibar beach holiday with local insider tips, hidden beaches, and top restaurants.",
    date: "Aug 25, 2026",
    author: "David Osei",
    category: "Travel Tips",
    readTime: "5 min read",
    image: "/images/zanzibar.jpg",
  },
  {
    title: "Ngorongoro Crater: Earth's Natural Wonder",
    excerpt: "A deep dive into one of Africa's most extraordinary ecosystems – its geology, wildlife, and conservation.",
    date: "Aug 15, 2026",
    author: "James Mwangi",
    category: "Destinations",
    readTime: "7 min read",
    image: "/images/ngorongoro.jpg",
  },
];

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Travel Stories & Tips"
        title="Our Blog"
        subtitle="Tips, stories, and insights to help you plan your next adventure and make the most of your journey."
        imageSrc="/images/mikumi.jpg"
        imageAlt="African landscape for blog"
      />

      {/* Category Filter */}
      <section className="bg-[var(--dark-2)] border-b border-white/8 sticky top-[72px] z-40">
        <div className="max-w-[1320px] mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                cat.active
                  ? "bg-[var(--gold)] text-black border-[var(--gold)]"
                  : "bg-transparent text-white/70 border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
          {/* Search */}
          <div className="ml-auto shrink-0 relative hidden md:block">
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-[var(--dark-3)] border border-white/10 rounded-full px-4 py-2 text-sm text-white/70 placeholder:text-white/30 outline-none focus:border-[var(--gold)] pr-10 w-48 transition-all"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="bg-[var(--dark)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Featured Post */}
          <div className="mb-14">
            <p className="section-label mb-5">Featured Story</p>
            <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 card-hover group">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--dark-3)]" />
                <span className="absolute top-4 left-4 bg-[var(--gold)] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {featuredPost.category}
                </span>
              </div>
              <div className="p-8 md:p-10 bg-[var(--dark-3)] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                  <span>·</span>
                  <span>By {featuredPost.author}</span>
                </div>
                <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <Link
                  href="/blog"
                  className="self-start flex items-center gap-2 text-[var(--gold)] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Post Grid */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Latest Articles</h2>
            <span className="text-white/40 text-sm">{posts.length} articles</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-xl overflow-hidden border border-white/8 card-hover group bg-[var(--dark-3)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-white/35 text-[11px] mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/35 text-xs">By {post.author}</span>
                    <Link
                      href="/blog"
                      className="flex items-center gap-1 text-[var(--gold)] text-sm font-semibold hover:gap-2 transition-all"
                    >
                      Read More
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline text-sm">
              Load More Articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--dark-2)] py-14 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <p className="section-label mb-3">Stay Updated</p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Get Safari Insights in Your Inbox
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
            Subscribe for expert travel tips, destination guides, and exclusive offers direct from Tanzania.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="input-dark flex-1 text-sm"
            />
            <button type="submit" className="btn-gold text-sm shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

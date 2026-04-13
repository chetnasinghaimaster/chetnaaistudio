import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const params = selectedTag ? `?tag=${selectedTag}` : '';
      try {
        const res = await fetch(`${BACKEND_URL}/api/blog${params}`);
        setPosts(await res.json());
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [selectedTag]);

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="blog-page">
      {/* Header */}
      <header className="bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="blog-home-link">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-sm text-white">C</div>
            <span className="font-['Poppins'] font-bold text-lg tracking-tight text-white">Chetna AI Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-[#888] hover:text-white transition-colors hidden sm:block">Home</Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0A0A0A] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all"
              data-testid="blog-header-cta"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors mb-8" data-testid="blog-back-link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Blog Header */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">Blog</p>
          <h1 className="font-['Poppins'] text-4xl sm:text-5xl font-bold tracking-tighter text-white mb-4">
            Insights & Tips
          </h1>
          <p className="text-base text-[#888] max-w-xl">
            Actionable advice on web design, branding, and growing your business online.
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-10" data-testid="blog-tags-filter">
            <button
              onClick={() => setSelectedTag('')}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                !selectedTag ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-white/10 text-[#888] hover:text-white'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  selectedTag === tag ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-white/10 text-[#888] hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="text-[#555] text-sm text-center py-20">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#888] text-lg mb-2">No posts yet</p>
            <p className="text-sm text-[#555]">Check back soon for insights and tips!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-[#121212] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
                data-testid={`blog-card-${post.slug}`}
              >
                {post.cover_image && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  {post.tags?.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="font-['Poppins'] text-lg font-semibold text-white mb-2 group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#888] line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#555]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#555] group-hover:text-[#3B82F6] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Blog CTA */}
      <div className="border-t border-white/5 py-16 text-center">
        <h2 className="font-['Poppins'] text-2xl font-bold text-white mb-4">
          Ready to grow your business?
        </h2>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-200 transition-all"
          data-testid="blog-footer-cta"
        >
          Get Free Website Audit
          <ArrowRight size={18} />
        </a>
        <p className="text-xs text-[#555] mt-3">No spam. No pressure.</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Simple markdown-like renderer
function renderContent(content) {
  if (!content) return null;
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('### ')) {
      return <h3 key={i} className="font-['Poppins'] text-xl font-semibold text-white mt-8 mb-3">{block.slice(4)}</h3>;
    }
    if (block.startsWith('## ')) {
      return <h2 key={i} className="font-['Poppins'] text-2xl font-bold text-white mt-10 mb-4">{block.slice(3)}</h2>;
    }
    if (block.startsWith('# ')) {
      return <h1 key={i} className="font-['Poppins'] text-3xl font-bold text-white mt-10 mb-4">{block.slice(2)}</h1>;
    }
    if (block.startsWith('- ') || block.startsWith('* ')) {
      const items = block.split('\n').filter(Boolean);
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 text-[#ccc]">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{item.replace(/^[-*]\s/, '')}</li>
          ))}
        </ul>
      );
    }
    if (block.startsWith('> ')) {
      return (
        <blockquote key={i} className="border-l-2 border-[#3B82F6] pl-4 my-6 text-[#888] italic">
          {block.slice(2)}
        </blockquote>
      );
    }
    // Bold text
    const formatted = block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    return <p key={i} className="text-[#ccc] text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/blog/${slug}`);
        if (!res.ok) { setNotFound(true); setLoading(false); return; }
        setPost(await res.json());
      } catch (e) {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-[#555] text-sm">Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6" data-testid="blog-not-found">
        <h1 className="font-['Poppins'] text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-[#3B82F6] text-sm hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="blog-post-page">
      {/* Header */}
      <header className="bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-sm text-white">C</div>
            <span className="font-['Poppins'] font-bold text-lg tracking-tight text-white">Chetna AI Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-sm text-[#888] hover:text-white transition-colors hidden sm:block">Blog</Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0A0A0A] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors mb-8"
          data-testid="blog-post-back"
        >
          <ArrowLeft size={16} />
          All Posts
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-[#888] mb-8 pb-8 border-b border-white/5">
          <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
            <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-[#888] leading-relaxed mb-8 font-medium">{post.excerpt}</p>
        )}

        {/* Content */}
        <div className="prose-dark">
          {renderContent(post.content)}
        </div>
      </article>

      {/* Post CTA */}
      <div className="border-t border-white/5 py-16 text-center">
        <h2 className="font-['Poppins'] text-2xl font-bold text-white mb-4">
          Need help with your website?
        </h2>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-200 transition-all"
          data-testid="blog-post-cta"
        >
          Get Free Website Audit
          <ArrowRight size={18} />
        </a>
        <p className="text-xs text-[#555] mt-3">No spam. No pressure.</p>
      </div>
    </div>
  );
}

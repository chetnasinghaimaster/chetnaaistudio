import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EMPTY_POST = { title: '', excerpt: '', content: '', cover_image: '', tags: [], author: 'Chetna AI Studio', published: false };

export default function AdminBlog({ password }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list, 'new' = create, postId = edit
  const [form, setForm] = useState({ ...EMPTY_POST });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const headers = { 'Content-Type': 'application/json', 'x-admin-password': password };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/blog`, { headers: { 'x-admin-password': password } });
      setPosts(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const openEditor = (post) => {
    if (post) {
      setForm({ title: post.title, excerpt: post.excerpt, content: post.content, cover_image: post.cover_image, tags: post.tags || [], author: post.author, published: post.published });
      setEditing(post.id);
    } else {
      setForm({ ...EMPTY_POST });
      setEditing('new');
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editing === 'new') {
        await fetch(`${BACKEND_URL}/api/admin/blog`, { method: 'POST', headers, body: JSON.stringify(form) });
      } else {
        await fetch(`${BACKEND_URL}/api/admin/blog/${editing}`, { method: 'PUT', headers, body: JSON.stringify(form) });
      }
      setEditing(null);
      fetchPosts();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(`${BACKEND_URL}/api/admin/blog/${id}`, { method: 'DELETE', headers: { 'x-admin-password': password } });
    fetchPosts();
  };

  const togglePublish = async (post) => {
    await fetch(`${BACKEND_URL}/api/admin/blog/${post.id}`, {
      method: 'PUT', headers,
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });

  // Editor View
  if (editing !== null) {
    return (
      <div data-testid="blog-editor">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Poppins'] text-2xl font-bold text-white">
            {editing === 'new' ? 'New Post' : 'Edit Post'}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="text-[#888] hover:text-white transition-colors"
            data-testid="blog-editor-cancel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 max-w-3xl">
          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Blog post title"
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50"
              data-testid="blog-title-input"
            />
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Excerpt</label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Short description for previews"
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50"
              data-testid="blog-excerpt-input"
            />
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Cover Image URL</label>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50"
              data-testid="blog-cover-input"
            />
            {form.cover_image && (
              <img src={form.cover_image} alt="" className="mt-3 h-32 rounded-xl object-cover" />
            )}
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Content (Markdown supported)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your blog post content here..."
              rows={14}
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 resize-y font-mono"
              data-testid="blog-content-input"
            />
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.tags.map((tag) => (
                <span key={tag} className="bg-[#3B82F6]/10 text-[#3B82F6] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag"
                className="flex-1 bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50"
                data-testid="blog-tag-input"
              />
              <button onClick={addTag} className="bg-white/5 border border-white/10 px-4 rounded-xl text-sm text-white hover:bg-white/10 transition-colors">
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-1.5 block">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]/50"
              data-testid="blog-author-input"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-[#3B82F6]"
                data-testid="blog-published-checkbox"
              />
              <span className="text-sm text-white">Publish immediately</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
              data-testid="blog-save-button"
            >
              <Save size={16} />
              {saving ? 'Saving...' : editing === 'new' ? 'Create Post' : 'Update Post'}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-3 rounded-full text-sm text-[#888] hover:text-white border border-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div data-testid="admin-blog-tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-['Poppins'] text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-sm text-[#888]">{posts.length} posts</p>
        </div>
        <button
          onClick={() => openEditor(null)}
          className="flex items-center gap-2 bg-[#3B82F6] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all"
          data-testid="blog-new-post-button"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {loading ? (
        <p className="text-[#555] text-sm py-12 text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="bg-[#121212] rounded-2xl border border-white/5 p-12 text-center">
          <p className="text-[#888] text-sm mb-4">No blog posts yet</p>
          <button
            onClick={() => openEditor(null)}
            className="text-[#3B82F6] text-sm hover:underline"
          >
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#121212] rounded-xl border border-white/5 p-5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors"
              data-testid={`blog-post-item-${post.id}`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {post.cover_image && (
                  <img src={post.cover_image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{post.title}</h3>
                  <p className="text-xs text-[#555] truncate">{post.excerpt || 'No excerpt'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-[#555]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 text-[#888] hover:text-white transition-colors"
                  title={post.published ? 'Unpublish' : 'Publish'}
                  data-testid={`blog-toggle-publish-${post.id}`}
                >
                  {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => openEditor(post)}
                  className="p-2 text-[#888] hover:text-[#3B82F6] transition-colors"
                  data-testid={`blog-edit-${post.id}`}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-[#888] hover:text-red-400 transition-colors"
                  data-testid={`blog-delete-${post.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

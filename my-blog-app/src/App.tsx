import { useState } from 'react';
import Layout from './components/Layout';
import PostList from './components/PostList';
import { useBlogs, Blog } from './hooks/useBlogs';
import { useUserProfile } from './hooks/useUserProfile';
import { AuthorCard } from './components/AuthorCard';
import { LikeDislike } from './components/LikeDislike';
import { CommentsSection } from './components/CommentsSection';
import { CreateBlogModal } from './components/CreateBlogModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ProfileCard } from './components/ProfileCard';
import { Plus, User } from 'lucide-react';
import './App.css';

function App() {
  const { data: blogs, isLoading, error, addBlog, deleteBlog } = useBlogs();
  const { profile, incrementPosts, decrementPosts } = useUserProfile();
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleCreateBlog = (newBlog: Omit<Blog, 'id'>) => {
    addBlog(newBlog);
    incrementPosts();
    setIsCreateModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingBlogId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingBlogId !== null) {
      deleteBlog(deletingBlogId);
      decrementPosts();
      if (selectedBlog?.id === deletingBlogId) {
        setSelectedBlog(undefined);
      }
      setDeleteConfirmOpen(false);
      setDeletingBlogId(null);
    }
  };

  return (
    <Layout>
      {/* Profile Button - Top Right Corner */}
      <button
        onClick={() => setIsProfileOpen(true)}
        className="fixed top-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow z-30 hover:scale-110 transform"
        title="View your profile"
      >
        <User size={28} />
      </button>

      {/* Profile Modal */}
      <ProfileCard 
        profile={profile} 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      <div className="h-[calc(100vh-60px)] flex gap-0">
        {/* Sidebar - Posts List with Shadow Effect */}
        <aside className="w-96 border-r bg-gradient-to-b from-white via-white to-slate-50 flex flex-col flex-shrink-0 overflow-hidden shadow-lg">
          <div className="p-6 border-b bg-white sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-slate-900">Latest Posts</h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg hover:shadow-lg transition flex items-center gap-2"
                title="Create new blog"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="text-sm text-slate-600">
              {blogs?.length || 0} posts
            </div>
          </div>
          <div className="flex-1 overflow-y-auto smooth-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-white">
            {isLoading && <p className="text-center text-slate-400 p-4">Loading...</p>}
            {error && <p className="text-center text-red-500 p-4">Error loading posts</p>}
            {!isLoading && blogs && (
              <div className="p-4 space-y-3">
                <PostList
                  posts={blogs}
                  onSelect={(blog) => setSelectedBlog(blog)}
                  selectedId={selectedBlog?.id}
                  onDelete={handleDeleteClick}
                />
              </div>
            )}
          </div>
        </aside>

        {/* Main Content - Article + Author + Comments */}
        <main className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
          {selectedBlog ? (
            <>
              {/* Article Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <article className="bg-white">
                  {/* Cover Image */}
                  <img 
                    src={selectedBlog.coverImage} 
                    alt={selectedBlog.title}
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Article Content */}
                  <div className="max-w-4xl mx-auto px-8 py-12">
                    <h1 className="text-5xl font-bold mb-4 text-slate-900">{selectedBlog.title}</h1>
                    
                    {/* Categories */}
                    <div className="flex gap-2 mb-6">
                      {selectedBlog.category.map((cat) => (
                        <span key={cat} className="bg-blue-100 text-blue-800 text-xs font-medium px-4 py-2 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-lg text-slate-700 mb-8 font-medium leading-relaxed">{selectedBlog.description}</p>
                    
                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none">
                      {selectedBlog.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-6 text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              </div>

              {/* Fixed Bottom Sections - Author, Like/Dislike, Comments */}
              <div className="bg-slate-50 border-t border-slate-200 flex flex-col max-h-[35vh]">
                {/* Author Card - Fixed */}
                <AuthorCard date={selectedBlog.date} />

                {/* Like/Dislike - Fixed */}
                <LikeDislike postId={selectedBlog.id} />

                {/* Comments Section - Scrollable */}
                <div className="flex-1 overflow-hidden">
                  <CommentsSection postId={selectedBlog.id} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-slate-400 text-3xl font-semibold">👈 Select a post to read</p>
              <p className="text-slate-300 text-base mt-4">Choose any post from the list to view its content, author details, and comments</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <Plus size={20} />
                Create Your First Blog
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Create Blog Modal */}
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBlog}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        blogTitle={blogs?.find(b => b.id === deletingBlogId)?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setDeletingBlogId(null);
        }}
      />
    </Layout>
  );
}

export default App;
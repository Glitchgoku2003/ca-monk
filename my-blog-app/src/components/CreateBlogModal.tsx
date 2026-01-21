import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Blog } from '../hooks/useBlogs';

const PUBLISHER_NAME = 'CA Monk';
const PUBLISHER_BIO = 'Chartered Accountant & Tech Enthusiast';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (blog: Omit<Blog, 'id'>) => void;
}

export function CreateBlogModal({ isOpen, onClose, onSubmit }: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
  });
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (categories.length === 0) {
      alert('Please add at least one category');
      return;
    }

    const newBlog: Omit<Blog, 'id'> = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: categories,
      publisher: PUBLISHER_NAME,
      publisherBio: PUBLISHER_BIO,
      date: formData.date,
      coverImage: formData.coverImage
    };

    onSubmit(newBlog);
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    });
    setCategories([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Create New Blog Post</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a short description"
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter the full blog content (separate paragraphs with blank lines)"
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Categories *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                placeholder="Type and press Enter to add category"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => removeCategory(cat)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Publication Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-white pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  avatar: string;
}

interface CommentsSectionProps {
  postId: number;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'John Developer',
      text: 'Great article! Really helped me understand the concepts better.',
      timestamp: '2 days ago',
      avatar: 'JD'
    },
    {
      id: 2,
      author: 'Sarah React',
      text: 'This is exactly what I was looking for. Thanks for the detailed explanation!',
      timestamp: '1 day ago',
      avatar: 'SR'
    },
    {
      id: 3,
      author: 'Mike Code',
      text: 'Can you elaborate more on the performance optimization part?',
      timestamp: '12 hours ago',
      avatar: 'MC'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: 'You',
        text: newComment,
        timestamp: 'Just now',
        avatar: 'YO'
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white border-t border-slate-200">
      {/* Comments Header */}
      <div className="px-6 py-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Comments</h3>
        <p className="text-sm text-slate-500">{comments.length} comments</p>
      </div>

      {/* Comment Input */}
      <div className="px-6 py-6 border-b border-slate-200">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            YO
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts... (Press Ctrl+Enter to post)"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                  handlePostComment();
                }
              }}
            />
            <button
              onClick={handlePostComment}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="px-6 py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {comment.avatar}
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{comment.author}</span>
                  <span className="text-xs text-slate-500">{comment.timestamp}</span>
                </div>
                <p className="mt-2 text-slate-700 leading-relaxed">{comment.text}</p>
                <button className="mt-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

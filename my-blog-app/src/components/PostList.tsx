import React from 'react';
import { Blog } from '../hooks/useBlogs';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash2 } from 'lucide-react';

interface PostListProps {
  posts: Blog[];
  onSelect: (blog: Blog) => void;
  selectedId?: number;
  onDelete?: (id: number) => void;
}

export default function PostList({ posts, onSelect, selectedId, onDelete }: PostListProps) {
  return (
    <div className="grid gap-3">
      {posts.map((post, index) => (
        <div
          key={post.id}
          style={{
            animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
          }}
          className="animate group"
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-102 overflow-hidden transform ${
              selectedId === post.id 
                ? 'border-blue-500 ring-2 ring-blue-400 shadow-xl scale-102' 
                : 'hover:border-blue-400 shadow-md'
            }`}
            onClick={() => onSelect(post)}
          >
            {/* Cover Image in Sidebar */}
            {post.coverImage && (
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110 relative"
              />
            )}
            
            <CardHeader className="p-4 pb-2">
              <div className="flex gap-2 mb-2 flex-wrap">
                {post.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-[10px]">
                    {cat}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-base leading-tight text-blue-600 hover:underline">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-2">{post.date}</div>
                  {post.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(post.id);
                    }}
                    className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                    title="Delete this post"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
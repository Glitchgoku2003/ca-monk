import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface LikeDislikeProps {
  postId: number;
}

export function LikeDislike({ postId }: LikeDislikeProps) {
  const { addLike, removeLike, addDislike, removeDislike } = useUserProfile();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [dislikeCount, setDislikeCount] = useState(3);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      removeLike();
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      addLike();
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
        removeDislike();
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
      removeDislike();
    } else {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      addDislike();
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
        removeLike();
      }
    }
  };

  return (
    <div className="flex items-center gap-6 bg-white border-t border-slate-200 px-6 py-4">
      <span className="text-slate-600 font-medium">Was this helpful?</span>
      
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          liked
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
        }`}
      >
        <ThumbsUp size={20} />
        <span>{likeCount}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          disliked
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
        }`}
      >
        <ThumbsDown size={20} />
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
}

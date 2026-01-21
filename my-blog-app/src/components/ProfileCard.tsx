import { UserProfile } from '../hooks/useUserProfile';
import { Heart, ThumbsDown, BookOpen, X } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileCard({ profile, isOpen, onClose }: ProfileCardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900">Your Stats</h2>
          <p className="text-sm text-slate-500 mt-2">Track your reading activity</p>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          {/* Posts */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Posts</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{profile.totalPosts}</p>
              </div>
              <BookOpen size={40} className="text-blue-300" />
            </div>
          </div>

          {/* Likes */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Likes</p>
                <p className="text-4xl font-bold text-red-600 mt-2">{profile.totalLikes}</p>
              </div>
              <Heart size={40} className="text-red-300" />
            </div>
          </div>

          {/* Dislikes */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Dislikes</p>
                <p className="text-4xl font-bold text-orange-600 mt-2">{profile.totalDislikes}</p>
              </div>
              <ThumbsDown size={40} className="text-orange-300" />
            </div>
          </div>
        </div>

        {/* Close Button at Bottom */}
        <button
          onClick={onClose}
          className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

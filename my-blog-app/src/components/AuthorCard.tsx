import React from 'react';

const PUBLISHER_NAME = 'CA Monk';
const PUBLISHER_BIO = 'Chartered Accountant & Tech Enthusiast';

interface AuthorCardProps {
  date: string;
}

export function AuthorCard({ date }: AuthorCardProps) {
  // Get initials from CA Monk
  const initials = PUBLISHER_NAME
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-slate-200 p-6">
      <div className="flex items-center gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>
        </div>
        
        {/* Author Info */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-900">{PUBLISHER_NAME}</h3>
          <p className="text-sm text-slate-600">{PUBLISHER_BIO}</p>
          <p className="text-xs text-slate-500 mt-1">Published on {date}</p>
        </div>
      </div>
    </div>
  );
}

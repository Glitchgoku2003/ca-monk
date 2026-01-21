import { useState, useEffect } from 'react';

export interface UserProfile {
  totalLikes: number;
  totalDislikes: number;
  totalPosts: number;
}

const DEFAULT_PROFILE: UserProfile = {
  totalLikes: 0,
  totalDislikes: 0,
  totalPosts: 0
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const addLike = () => {
    setProfile(prev => ({
      ...prev,
      totalLikes: prev.totalLikes + 1
    }));
  };

  const removeLike = () => {
    setProfile(prev => ({
      ...prev,
      totalLikes: Math.max(0, prev.totalLikes - 1)
    }));
  };

  const addDislike = () => {
    setProfile(prev => ({
      ...prev,
      totalDislikes: prev.totalDislikes + 1
    }));
  };

  const removeDislike = () => {
    setProfile(prev => ({
      ...prev,
      totalDislikes: Math.max(0, prev.totalDislikes - 1)
    }));
  };

  const incrementPosts = () => {
    setProfile(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1
    }));
  };

  const decrementPosts = () => {
    setProfile(prev => ({
      ...prev,
      totalPosts: Math.max(0, prev.totalPosts - 1)
    }));
  };

  return {
    profile,
    addLike,
    removeLike,
    addDislike,
    removeDislike,
    incrementPosts,
    decrementPosts
  };
}

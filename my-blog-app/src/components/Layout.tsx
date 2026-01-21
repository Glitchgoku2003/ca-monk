import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto font-bold text-xl">
          CA Monk Blog
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
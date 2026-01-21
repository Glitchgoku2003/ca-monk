import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  blogTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, blogTitle, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Trash2 size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">Delete Post</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-700 mb-4">
            Are you sure you want to delete <span className="font-semibold">"{blogTitle}"</span>? 
            This action cannot be undone.
          </p>
          <p className="text-sm text-slate-500">
            All comments and associated data will also be deleted.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 py-4 bg-slate-50 border-t">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  content: string;
  date: string;
  coverImage: string;
  publisher: string;
  publisherBio?: string;
}

// Mock data for development/testing
const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React 19",
    category: ["React", "JavaScript"],
    description: "Learn the basics of React 19 and how to build interactive applications with modern features.",
    content: "React 19 introduces several new features and improvements:\n\n• Improved state management with hooks\n• Better performance with concurrent rendering\n• Enhanced developer experience\n• New features for building modern UIs\n\nReact 19 makes it easier to build fast, scalable applications. With the new features and improvements, you can create better user experiences with less code. The framework now includes built-in optimizations that help your applications perform better out of the box.",
    date: "January 15, 2026",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    publisher: "Sarah React",
    publisherBio: "React Developer & Tech Enthusiast"
  },
  {
    id: 2,
    title: "Vite vs Next.js: Choosing the Right Tool",
    category: ["Build Tools", "Performance"],
    description: "A comprehensive comparison between Vite and Next.js for your next project. Understand the pros and cons of each.",
    content: "Comparing Vite and Next.js:\n\nVite:\n✓ Lightning-fast development server\n✓ Minimal configuration\n✓ Great for SPA (Single Page Applications)\n✗ No built-in backend framework\n\nNext.js:\n✓ Full-stack framework\n✓ Built-in API routes\n✓ Excellent for SSR and static generation\n✗ Slightly heavier setup\n\nChoose Vite for frontend-only projects and Next.js when you need backend capabilities and server-side rendering.",
    date: "January 12, 2026",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    publisher: "John Developer",
    publisherBio: "Full-stack Developer & Build Tool Expert"
  },
  {
    id: 3,
    title: "Tailwind CSS Tips and Tricks",
    category: ["CSS", "Styling"],
    description: "Master Tailwind CSS with these helpful tips and practical examples for rapid UI development.",
    content: "Essential Tailwind CSS Tips:\n\n1. Use Responsive Prefixes\n   - md:text-2xl, lg:text-4xl for responsive text\n   - sm:w-1/2, md:w-1/3 for responsive widths\n\n2. Custom Configuration\n   - Extend colors and spacing\n   - Add custom utilities\n\n3. Performance Optimization\n   - Use PurgeCSS to remove unused styles\n   - Minimize CSS bundle size\n\n4. Best Practices\n   - Organize utilities logically\n   - Use Tailwind plugins for consistency\n   - Keep component classes DRY\n\nTailwind CSS transforms how you write styles, enabling faster development and more maintainable code.",
    date: "January 10, 2026",
    coverImage: "https://images.unsplash.com/photo-1559163853-79a414ab62a3?w=500&h=300&fit=crop",
    publisher: "Emma Design",
    publisherBio: "UI/UX Designer & Tailwind CSS Specialist"
  },
  {
    id: 4,
    title: "TypeScript Best Practices",
    category: ["TypeScript", "Development"],
    description: "Write better TypeScript code with these proven best practices and patterns.",
    content: "TypeScript Best Practices Guide:\n\n1. Type Safety First\n   - Use strict mode in tsconfig.json\n   - Avoid using 'any' type\n   - Define explicit interfaces for objects\n\n2. Code Organization\n   - Separate types in dedicated files\n   - Use namespaces for logical grouping\n   - Keep components small and focused\n\n3. Error Handling\n   - Use union types for error cases\n   - Implement proper error boundaries\n   - Log errors appropriately\n\n4. Testing\n   - Write unit tests for utilities\n   - Test type safety with jest\n   - Validate runtime behavior\n\nTypScript provides powerful type checking that helps catch bugs early and makes your code more maintainable and self-documenting.",
    date: "January 8, 2026",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    publisher: "Mike Code",
    publisherBio: "TypeScript Advocate & Software Architect"
  },
  {
    id: 5,
    title: "Building REST APIs with Node.js",
    category: ["Node.js", "Backend"],
    description: "Create robust and scalable REST APIs using Node.js and Express framework.",
    content: "Building REST APIs with Node.js:\n\nSetup:\n1. npm init -y\n2. npm install express cors dotenv\n3. Create server.js\n\nBasic Structure:\n- Define routes for each resource\n- Implement CRUD operations\n- Add middleware for validation\n- Handle errors properly\n\nBest Practices:\n✓ Use RESTful conventions\n✓ Implement proper authentication\n✓ Add input validation\n✓ Write comprehensive documentation\n✓ Use environment variables\n✓ Implement logging\n\nA well-designed REST API is the backbone of modern web applications. Following these practices ensures your API is secure, maintainable, and easy to use.",
    publisher: "Alex Backend",
    publisherBio: "Backend Engineer & API Design Expert",
    date: "January 5, 2026",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
  }
];

export function useBlogs() {
  const [localBlogs, setLocalBlogs] = useState<Blog[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('blogs');
    return saved ? JSON.parse(saved) : MOCK_BLOGS;
  });
  
  const queryClient = useQueryClient();

  // Save to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(localBlogs));
  }, [localBlogs]);

  const { data = localBlogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/blogs', {
          timeout: 5000
        });
        return data;
      } catch (error) {
        console.log('Failed to fetch from API, using local data');
        // Return local blogs if API fails
        return localBlogs;
      }
    },
    initialData: localBlogs,
  });

  const addBlog = (newBlog: Omit<Blog, 'id'>) => {
    const id = Math.max(...localBlogs.map(b => b.id), 0) + 1;
    const blog: Blog = { ...newBlog, id };
    setLocalBlogs([blog, ...localBlogs]);
    queryClient.setQueryData(['blogs'], [blog, ...localBlogs]);
    return blog;
  };

  const deleteBlog = (id: number) => {
    const updated = localBlogs.filter(blog => blog.id !== id);
    setLocalBlogs(updated);
    queryClient.setQueryData(['blogs'], updated);
  };

  const updateBlog = (id: number, updatedBlog: Omit<Blog, 'id'>) => {
    const updated = localBlogs.map(blog =>
      blog.id === id ? { ...blog, ...updatedBlog } : blog
    );
    setLocalBlogs(updated);
    queryClient.setQueryData(['blogs'], updated);
  };

  return {
    data,
    isLoading,
    error,
    addBlog,
    deleteBlog,
    updateBlog,
  };
}
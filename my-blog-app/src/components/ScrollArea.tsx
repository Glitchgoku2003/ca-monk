import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className }, ref) => (
    <ScrollAreaPrimitive.Root className={className}>
      <ScrollAreaPrimitive.Viewport ref={ref} className="h-full w-full">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex touch-none select-none transition-colors p-0.5" />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };

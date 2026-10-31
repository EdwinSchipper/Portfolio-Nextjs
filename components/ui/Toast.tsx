'use client';

import React from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';

export interface ToastProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Universal Toast / Notification component using @headlessui/react Dialog.
 * Provides accessible popup notifications and consent toasts with brand styling.
 */
export default function Toast({
  open,
  onClose = () => {},
  title,
  description,
  children,
  className = '',
}: ToastProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-[9999]">
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] max-w-[340px] w-[calc(100%-2rem)] pointer-events-auto">
        <DialogPanel
          transition
          className={`p-6 bg-background-200/90 dark:bg-background-900/90 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-2xl flex flex-col gap-4 transform transition-all duration-500 ease-out data-closed:opacity-0 data-closed:translate-y-4 data-closed:scale-95 ${className}`}
        >
          <div>
            <DialogTitle
              as="h3"
              className="text-title-100 dark:text-title-200 text-title_6 font-semibold mb-2"
            >
              {title}
            </DialogTitle>
            <Description
              as="p"
              className="text-content-100 dark:text-content-200 text-sm leading-relaxed"
            >
              {description}
            </Description>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}


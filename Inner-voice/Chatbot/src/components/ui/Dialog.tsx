import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useThemeClasses } from '../../contexts/ThemeContext';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const themeClasses = useThemeClasses();

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={`fixed inset-0 z-50 ${themeClasses.modalStyles.overlayBg} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className}`}
      {...props}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const themeClasses = useThemeClasses();

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl ${themeClasses.modalStyles.contentBg} ${themeClasses.modalStyles.border} ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ${themeClasses.modalStyles.textPrimary}`}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const themeClasses = useThemeClasses();

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`${themeClasses.modalStyles.fontHeading} font-semibold leading-none tracking-tight ${themeClasses.modalStyles.textPrimary} ${className}`}
      {...props}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const themeClasses = useThemeClasses();

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={`${themeClasses.modalStyles.fontLabel} ${themeClasses.modalStyles.textSecondary} ${className}`}
      {...props}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Export with both old names (for backward compatibility) and new names (for consistency)
export {
  // Old names for backward compatibility with existing imports
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  // New names for namespace imports (e.g., Dialog.Root)
  Dialog as Root,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogHeader as Header,
  DialogTitle as Title,
  DialogDescription as Description,
};
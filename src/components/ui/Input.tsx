import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BaseInputProps {
  label?: string;
  error?: string;
  tone?: "ember" | "copper" | "flame" | "metal";
  className?: string;
}

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;

const baseStyles = cn(
  "w-full min-h-[3rem] rounded-lg border bg-bg-tertiary/60 text-text-primary",
  "placeholder:text-text-muted px-4 py-3 text-sm",
  "transition-all duration-200",
  "focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30",
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, ...props }, ref) {
    const errorId = props.id ? `${props.id}-error` : undefined;
    const describedBy = error ? errorId : props["aria-describedby"];

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={props.id} className="block text-sm text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(baseStyles, error ? "border-red-500/50" : "border-border-default", className)}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, error, className, ...props }, ref) {
  const errorId = props.id ? `${props.id}-error` : undefined;
  const describedBy = error ? errorId : props["aria-describedby"];

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={props.id} className="block text-sm text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(baseStyles, "resize-y min-h-[6.25rem]", error ? "border-red-500/50" : "border-border-default", className)}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
});

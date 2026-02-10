import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
}

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

const baseClasses =
  "w-full bg-surface-2/80 border border-stroke-subtle text-text-primary placeholder:text-text-muted/50 rounded-sm px-4 py-3 text-sm font-body transition-all duration-200 focus:border-flame focus:ring-1 focus:ring-flame/30 focus:outline-none";

const errorClasses =
  "border-ember focus:border-ember focus:ring-ember/30";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className = "", ...props }, ref) {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${error ? errorClasses : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-ember mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, Omit<TextareaProps, "multiline">>(
  function Textarea({ label, error, className = "", ...props }, ref) {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={4}
          className={`${baseClasses} resize-y min-h-[100px] ${error ? errorClasses : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-ember mt-1">{error}</p>
        )}
      </div>
    );
  }
);

import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

interface BaseInputProps {
  label?: string;
  error?: string;
  tone?: "ember" | "copper" | "flame" | "metal";
  className?: string;
}

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

const baseClasses =
  "w-full min-h-[3rem] input-shell text-text-primary placeholder:text-text-3/80 rounded-xl px-4 py-3 text-sm font-body transition-all duration-200 focus:outline-none";

const focusClasses: Record<NonNullable<BaseInputProps["tone"]>, string> = {
  ember: "focus:border-ember focus:shadow-[0_0_0_1px_rgba(169,111,99,0.45),0_0_16px_rgba(147,69,64,0.24)]",
  copper: "focus:border-copper focus:shadow-[0_0_0_1px_rgba(231,166,133,0.45),0_0_16px_rgba(222,141,109,0.2)]",
  flame: "focus:border-ember focus:shadow-[0_0_0_1px_rgba(169,111,99,0.45),0_0_16px_rgba(147,69,64,0.24)]",
  metal: "focus:border-copper focus:shadow-[0_0_0_1px_rgba(231,166,133,0.45),0_0_16px_rgba(222,141,109,0.2)]",
};

const errorClasses =
  "!border-ember focus:!border-ember focus:shadow-[0_0_0_1px_rgba(169,111,99,0.45),0_0_16px_rgba(147,69,64,0.24)]";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, tone = "ember", className = "", ...props },
  ref
) {
  const errorId = props.id ? `${props.id}-error` : undefined;
  const describedBy = error ? errorId : props["aria-describedby"];

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-[0.75rem] font-accent font-medium uppercase tracking-[0.14em] text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${baseClasses} ${focusClasses[tone]} ${error ? errorClasses : ""} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-ember mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, Omit<TextareaProps, "multiline">>(
  function Textarea({ label, error, tone = "ember", className = "", ...props }, ref) {
    const errorId = props.id ? `${props.id}-error` : undefined;
    const describedBy = error ? errorId : props["aria-describedby"];

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-[0.75rem] font-accent font-medium uppercase tracking-[0.14em] text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={4}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${baseClasses} ${focusClasses[tone]} resize-y min-h-[6.25rem] ${error ? errorClasses : ""} ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-ember mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

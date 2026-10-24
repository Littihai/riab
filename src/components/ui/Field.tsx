import {
  cloneElement,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

/**
 * Label above the control, hint or error below. The control gets an id, the
 * description is wired with aria-describedby, the error is announced
 * (role=alert) and marks the control invalid; `required` adds the marker and
 * aria-required.
 */
export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement;
}) {
  const id = useId();
  const descId = `${id}-desc`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-describedby": error || hint ? descId : undefined,
        "aria-required": required || undefined,
        invalid: error ? true : (children.props as { invalid?: boolean }).invalid,
      })
    : children;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {required && (
          <span className="req" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {control}
      {error ? (
        <span id={descId} className="error-text" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={descId} className="hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export function Input({ invalid, ...rest }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input {...rest} className="input" aria-invalid={invalid || undefined} />;
}

export function Textarea({ invalid, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea {...rest} className="input" aria-invalid={invalid || undefined} />;
}

export function Select({
  invalid,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select {...rest} className="input" aria-invalid={invalid || undefined}>
      {children}
    </select>
  );
}

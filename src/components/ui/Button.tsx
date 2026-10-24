import type { ButtonHTMLAttributes } from "react";

export function Button({ variant = "primary", className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const cls = variant === "ghost" ? "btn ghost" : "btn";
  return <button {...rest} className={className ? `${cls} ${className}` : cls} />;
}

import type { ButtonHTMLAttributes } from "react";

export function Button({
  variant = "primary",
  type = "button",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const cls = variant === "ghost" ? "btn ghost" : "btn";
  return <button {...rest} type={type} className={className ? `${cls} ${className}` : cls} />;
}

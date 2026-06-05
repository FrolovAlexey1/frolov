import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * Image in a fixed-aspect frame, desaturated by default and warming to full
 * colour on hover — the Cold Design treatment (B&W base, single accent).
 */
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  position = "center",
  rounded = "rounded-2xl",
  tone = "hover",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  rounded?: string;
  tone?: "hover" | "gray" | "color";
}) {
  const grayClass =
    tone === "color"
      ? ""
      : tone === "gray"
      ? "grayscale"
      : "grayscale hover:grayscale-0";
  return (
    <div className={`group relative overflow-hidden ${rounded} ${className}`}>
      <Image
        src={asset(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: position }}
        className={`object-cover transition-all duration-700 ${grayClass} ${imgClassName}`}
      />
    </div>
  );
}

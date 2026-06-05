import Image from "next/image";
import { asset } from "@/lib/asset";
import { CLIENTS } from "@/lib/content";

/**
 * Logo wall. Real client logos render desaturated and warm to full colour on
 * hover (pure CSS). Brands without a supplied vector fall back to a styled
 * wordmark; final approved logos are confirmed by the client per TЗ §7.8.
 */
export function LogoCloud() {
  return (
    <div className="mt-12 space-y-10">
      {CLIENTS.map((group) => (
        <div key={group.group}>
          <h3 className="mb-4 text-[12.5px] font-600 uppercase tracking-[0.16em] text-muted">
            {group.group}
          </h3>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
            {group.items.map((c) => (
              <div
                key={c.name}
                className="group flex min-h-[96px] items-center justify-center border-b border-r border-line bg-paper px-5 py-6 transition-colors hover:bg-paper-2"
              >
                {c.logo ? (
                  <Image
                    src={asset(c.logo)}
                    alt={c.name}
                    width={120}
                    height={48}
                    sizes="160px"
                    className="max-h-9 w-auto object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-center text-[15px] font-700 leading-tight tracking-tight text-[#b2b2ac] transition-colors duration-300 group-hover:text-flame">
                    {c.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

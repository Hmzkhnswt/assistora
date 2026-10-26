import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "../../../public/images/branding/assistora-logo.png";
import logoWhite from "../../../public/images/branding/assistora-logo-white.png";
import icon from "../../../public/images/branding/assistora-icon.png";

/** The Assistora app-icon mark on its own (gradient square with the "A"). */
export function LogoMark({ className }: { className?: string }) {
  return <Image src={icon} alt="" aria-hidden="true" sizes="96px" className={cn("shrink-0 rounded-[24%]", className ?? "size-9")} />;
}

/** Full horizontal logo. `dark` switches to the white wordmark for dark backgrounds. */
export function Logo({ dark = false, className, onClick, priority = false }: { dark?: boolean; className?: string; onClick?: () => void; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Assistora — home" onClick={onClick} className={cn("group inline-flex shrink-0 items-center", className)}>
      <Image
        src={dark ? logoWhite : logo}
        alt="Assistora"
        priority={priority}
        sizes="(min-width: 1024px) 160px, 140px"
        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-85 lg:h-9"
      />
    </Link>
  );
}

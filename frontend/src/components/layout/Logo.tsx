
import Image from "next/image";
import Link from "next/link";

export function Logo({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-xl"
      aria-label="SAFEpass, início"
    >
      <Image
        src="/safepass-logo.png"
        alt="SAFEpass"
        width={180}
        height={60}
        priority
        className="h-auto w-[145px] object-contain sm:w-[170px]"
      />
    </Link>
  );
}




"use client";

import { useCurrentTeam } from "@/app/t/[teamSlug]/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";

export function SettingsMenu() {
  const team = useCurrentTeam();
  return (
    <div className="flex flex-col gap-2 items-stretch">
      <NavLink relativeHref="">General</NavLink>
      {team?.isPersonal ? null : (
        <NavLink relativeHref="/members">Members</NavLink>
      )}
    </div>
  );
}

function NavLink({
  relativeHref,
  children,
}: {
  relativeHref: string;
  children: ReactNode;
}) {
  const currentPath = usePathname();
  const { teamSlug } = useParams();
  const linkPath = `/t/${teamSlug as string}/settings${relativeHref}`;
  const active =
    relativeHref === ""
      ? currentPath === linkPath
      : currentPath.startsWith(linkPath);
  return (
    <Link
      href={linkPath}
      className={cn(
        "text-sm rounded-md bg-background px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground",
        active ? "text-foreground" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

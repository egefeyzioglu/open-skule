"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { buttonVariants } from "src/components/ui/button";
import { cn } from "src/lib/utils";

type AuthButtonProps = {
  image?: string | null;
  name?: string | null;
};

function getInitials(name?: string | null) {
  if (!name) {
    return "OS";
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "OS";
}

export default function AuthButton({ image, name }: AuthButtonProps) {
  return (
    <Link
      href="/api/auth/signout"
      className={cn(buttonVariants({ variant: "outline" }), "h-10 px-3")}
    >
      <Avatar size="sm">
        <AvatarImage src={image ?? undefined} alt={name ?? "User profile"} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <span className="hidden max-w-32 truncate sm:inline">
        {name ?? "Profile"}
      </span>
    </Link>
  );
}

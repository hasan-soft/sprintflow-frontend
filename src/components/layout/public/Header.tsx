import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about-us" },
  ];

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-5">
        <Link className="font-heading text-lg font-bold" href="/">SprintFlow</Link>
        <nav aria-label="Main navigation" className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            Login
          </Button>
          <Button render={<Link href="/register">Get started</Link>} nativeButton={false}>Get started</Button>
        </div>
      </div>
    </header>
  );
}

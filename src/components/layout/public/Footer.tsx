import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-muted-foreground">
        <span>SprintFlow · Work moves forward.</span>
        <nav aria-label="Footer navigation" className="flex gap-5">
          <Link className="hover:text-foreground" href="/help">
            Help
          </Link>
          <Link className="hover:text-foreground" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-foreground" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ];

  return (
    <header className="w-full h-16 border border-b flex justify-center items-center">
      <nav className="flex gap-5">
        {routes.map((route) => (
          <Link key={route.url} href={route.url}>
            {route.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

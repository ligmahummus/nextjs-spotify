import Link from "next/link";
import AuthState from "./AuthState";

const Navigation = () => {
  return (
    <nav className="h-20 border-b-8 border-b-neutral-900 bg-zinc-800 flex items-center justify-between flex-row-reverse relative w-full px-4 md:px-0">
      <section className="container mx-auto flex flex-col">
        <div className="self-end">
          <AuthState />
        </div>
      </section>

      <h1 className="md:absolute md:left-1/2 md:-translate-x-1/2 text-5xl font-bold">
        <Link href="/">Easify</Link>
      </h1>
    </nav>
  );
};

export default Navigation;

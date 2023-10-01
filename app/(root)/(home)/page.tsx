import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/api/auth">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;

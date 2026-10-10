import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404 / WRONG TURN</span>
      <h1>This page left the composition.</h1>
      <Link href="/">Return to Copywrk ↗</Link>
    </main>
  );
}

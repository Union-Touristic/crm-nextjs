import Link from "next/link";

export default function Home() {
  return (
    <div>Home Page
      <br />
      <Link href='/crm/dashboard'>Go to Dashboard</Link>
    </div>
  )
}

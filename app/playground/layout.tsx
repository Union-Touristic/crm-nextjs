import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function PlaygroundLayout({ children }: Props) {
  return (
    <div className="p-8">
      <div>
        <Link href="/" className="underline">
          &larr; Back to Home Page
        </Link>
      </div>
      {children}
    </div>
  );
}

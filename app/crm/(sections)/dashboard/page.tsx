import type { Metadata } from "next";
import Title from "../_components/Title";


export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <>
      <Title>Dashboard</Title>
      <div className="py-4">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200"></div>
      </div>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дэшборд",
  description: "Дэшборд для управления турами",
};

export default function Dashboard() {
  return (
    <div>
      <h1>Здесь будет дэшборд</h1>
    </div>
  );
}

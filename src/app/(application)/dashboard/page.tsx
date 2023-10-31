import { signOut } from "~/auth";

export default function Dashboard() {
  return (
    <div>
      <h1>Здесь будет дэшборд</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Выйти</button>
      </form>
    </div>
  );
}

import Counter from "../islands/Counter.tsx";
import { pool } from "@db";

const client = await pool.connect();
const array_result = await client.queryArray<[number]>(
  "SELECT 1",
);
console.log(array_result);
client.release();

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
      <div class="font-mono">{JSON.stringify(array_result)}</div>
    </div>
  );
}
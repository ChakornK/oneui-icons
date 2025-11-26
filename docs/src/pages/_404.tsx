export function NotFound() {
  return (
    <main class={"flex h-full flex-col items-center justify-center p-8"}>
      <h1 class={"text-6xl"}>404</h1>
      <h2 class={"text-2xl font-light"}>PAGE NOT FOUND</h2>
      <a href="/" class={"mt-4 rounded-full bg-blue-600 px-4 py-2"}>
        Go to home
      </a>
    </main>
  );
}

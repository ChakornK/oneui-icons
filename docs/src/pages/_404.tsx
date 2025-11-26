export function NotFound() {
  return (
    <main
      class={
        "mt-16 flex h-[calc(100%-4rem)] flex-col items-stretch gap-4 p-8 pb-0"
      }
    >
      <div class={"flex flex-col items-center justify-center"}>
        <h1 class={"text-6xl"}>404</h1>
        <h2 class={"text-2xl font-light"}>PAGE NOT FOUND</h2>
        <a href="/" class={"mt-4 rounded-full bg-blue-600 px-4 py-2"}>
          Go to home
        </a>
      </div>
    </main>
  );
}

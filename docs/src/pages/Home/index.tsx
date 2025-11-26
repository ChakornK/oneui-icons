import "./style.css";
import { Tab } from "../../components/Tab";
import { IconCopyOutline } from "oneui-icons-react";

export function Home() {
  return (
    <main class={"flex h-full flex-col items-stretch justify-center gap-4 p-8"}>
      <div class={"flex flex-col items-stretch sm:flex-row"}>
        <div class={"flex flex-col gap-2 sm:w-1/2"}>
          <h1 class={"text-4xl"}>Get started</h1>
          <p>Run the following command </p>
          <Tab
            childList={[
              {
                name: "npm",
                component: "npm i oneui-icons-react",
              },
              {
                name: "pnpm",
                component: "pnpm add oneui-icons-react",
              },
              {
                name: "Yarn",
                component: "yarn add oneui-icons-react",
              },
            ].map((tab) => ({
              ...tab,
              component: (
                <div class={"relative rounded-lg bg-neutral-900 p-4 pr-16"}>
                  <pre>{tab.component}</pre>
                  <button
                    class="absolute bottom-3 right-3 top-3 flex aspect-square cursor-pointer items-center justify-center rounded-md bg-neutral-800"
                    onClick={() => navigator.clipboard.writeText(tab.component)}
                  >
                    <IconCopyOutline size={"1em"} />
                  </button>
                </div>
              ),
            }))}
          />
        </div>
        <div class={"sm:w-1/2"}>
          <p></p>
        </div>
      </div>
    </main>
  );
}

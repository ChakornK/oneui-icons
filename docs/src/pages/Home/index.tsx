import { useState } from "preact/hooks";
import { Tab } from "../../components/Tab";
import { IconCopyOutline } from "oneui-icons-react";
import * as allIcons from "oneui-icons-react";

import "./style.css";

export function Home() {
  return (
    <main
      class={
        "mt-16 flex h-[calc(100%-4rem)] flex-col items-stretch gap-4 p-8 pb-0"
      }
    >
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
      <IconGallery />
    </main>
  );
}

function IconGallery() {
  const [query, setQuery] = useState<string>("");

  return (
    <div class={"flex grow flex-col gap-2 overflow-hidden"}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery((e.target as HTMLInputElement).value || "")}
        placeholder={"Search"}
        class={
          "rounded-full border outline-none border-neutral-800 bg-neutral-900 px-6 py-2"
        }
      />
      <div class={"flex flex-wrap gap-2 overflow-y-auto p-2"}>
        {Object.entries(allIcons)
          .filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))
          .map(([name, Icon]) => (
            <button
              class={
                "flex h-32 w-32 flex-col p-2 justify-center items-center rounded-lg bg-neutral-900"
              }
            >
              <div class={"flex grow items-center justify-center"}>
                <Icon size={"2em"} />
              </div>
              <p class={"max-w-full overflow-hidden text-ellipsis text-sm"}>
                {name.replace("Icon", "")}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
}

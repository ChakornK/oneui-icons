import type { JSX } from "preact";
import { useState } from "preact/hooks";

interface TabProps {
  childList: {
    name: string;
    component: JSX.Element;
  }[];
}

export function Tab({ childList }: TabProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div class="flex h-full w-full flex-col items-stretch gap-2">
      <div class={"flex items-stretch gap-8 px-4"}>
        {childList.map(({ name }, index) => (
          <button
            class={`${
              index === activeIndex
                ? "before:w-full before:bg-blue-600 before:opacity-100"
                : "before:w-0 before:bg-white before:opacity-0 hover:before:w-full hover:before:opacity-100"
            }${" "}relative cursor-pointer py-2 before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:-translate-x-1/2 before:rounded-t-full before:transition-all before:duration-200 before:ease-out`}
            onClick={() => setActiveIndex(index)}
          >
            {name}
          </button>
        ))}
      </div>
      <div class="grow">{childList[activeIndex].component}</div>
    </div>
  );
}

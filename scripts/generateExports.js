import fs from "node:fs";

const reactTemplate = (fileName, svg) => {
  const replaceMap = {
    "clip-path": "clipPath",
    "fill-rule": "fillRule",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
  };
  let formattedSvg = svg;
  for (const [find, replace] of Object.entries(replaceMap)) {
    formattedSvg = formattedSvg.replaceAll(find, replace);
  }
  formattedSvg = formattedSvg.replace(`width="24" height="24"`, "width={size} height={size}");

  const componentName = `Icon${fileName
    .replace(".svg", "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")}`;
  return {
    name: componentName,
    code: `import React from "react";export default ({size}) => (${formattedSvg})`,
  };
};

const reactTypesTemplate = (name, svg) => {
  const beginPos = svg.search(/(?<=>)/);
  const svgWithBg = svg.slice(0, beginPos) + '<rect width="100%" height="100%" fill="#fff"/>' + svg.slice(beginPos);
  return `/**
  * @component @name ${name}
  * @description OneUI icon
  *
  * @preview ![img](data:image/svg+xml;base64,${btoa(svgWithBg)})
  *
  * @param {Object} props - Icon props
  * @param {number} props.size - Icon size
  * @returns {JSX.Element} JSX Element
  *
  */
declare const ${name}: React.RefAttributes<SVGSVGElement> & {size: number};\n\n`;
};

let reactExport = "";
let reactTypes = "";
if (!fs.existsSync("./packages/oneui-icons-react/icons")) {
  fs.mkdirSync("./packages/oneui-icons-react/icons");
}
for (const file of fs.readdirSync("./icons")) {
  if (file.endsWith(".svg")) {
    (() => {
      // react
      const svg = fs.readFileSync(`./icons/${file}`, "utf-8");
      const { name, code } = reactTemplate(file, svg);
      reactExport += `export {default as ${name}} from "./icons/${name}.jsx";\n`;
      reactTypes += reactTypesTemplate(name, svg);
      fs.writeFileSync(`./packages/oneui-icons-react/icons/${name}.jsx`, code);
    })();
  }
}

fs.writeFileSync("./packages/oneui-icons-react/index.js", reactExport);
fs.writeFileSync("./packages/oneui-icons-react/index.d.ts", reactTypes);

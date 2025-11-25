import fs from "node:fs";
import { parseString, Builder } from "xml2js";
import { optimize } from "svgo";

const builder = new Builder();
const parseXML = async (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

if (!fs.existsSync("./icons")) {
  fs.mkdirSync("./icons");
}
for (const file of fs.readdirSync("./drawable_xml")) {
  if (file.endsWith(".xml")) {
    const xml = fs.readFileSync(`./drawable_xml/${file}`, "utf-8").match(/<vector(.|\n)*>(.|\n)*<\/vector>/)[0];
    const icon = await parseXML(xml);
    icon.svg = icon.vector;
    delete icon.vector;

    icon.svg.$ = {
      xmlns: "http://www.w3.org/2000/svg",
      width: icon.svg.$["android:viewportWidth"],
      height: icon.svg.$["android:viewportHeight"],
      viewBox: `0 0 ${icon.svg.$["android:viewportWidth"]} ${icon.svg.$["android:viewportHeight"]}`,
    };

    let idCounter = 0;
    const getId = () => {
      return (idCounter++).toString(36);
    };
    if (icon.svg.group) {
      icon.svg.g = icon.svg.group;
      delete icon.svg.group;

      for (const g of icon.svg.g) {
        if (g["clip-path"]) {
          if (g.path) {
            const clipPath = g["clip-path"][0].$["android:pathData"];
            delete g["clip-path"];
            const clipPathId = getId();
            g.clipPath = [
              {
                $: {
                  id: clipPathId,
                },
                path: [
                  {
                    $: {
                      d: clipPath,
                    },
                  },
                ],
              },
            ];
            g.path[0].$ = {
              "clip-path": `url(#${clipPathId})`,
              "fill-rule": g.path[0].$["android:fillType"].toLowerCase(),
              "d": g.path[0].$["android:pathData"],
              "fill": g.path[0].$["android:fillColor"]
                ? !g.path[0].$["android:fillColor"]?.startsWith("#00000000")
                  ? "currentColor"
                  : g.path[0].$["android:fillColor"]
                : "none",
              "stroke-width": g.path[0].$["android:strokeWidth"],
              "stroke": g.path[0].$["android:strokeColor"]
                ? !g.path[0].$["android:strokeColor"]?.startsWith("#00000000")
                  ? "currentColor"
                  : g.path[0].$["android:strokeColor"]
                : "none",
              "stroke-linecap": g.path[0].$["android:strokeLineCap"],
              "stroke-linejoin": g.path[0].$["android:strokeLineJoin"],
            };
          } else {
            delete g["clip-path"];
          }
        }
      }
    }
    if (icon.svg.path) {
      for (const path of icon.svg.path) {
        path.$ = {
          "fill-rule": path.$["android:fillType"]?.toLowerCase(),
          "d": path.$["android:pathData"],
          "fill": path.$["android:fillColor"] ? (!path.$["android:fillColor"]?.startsWith("#00000000") ? "currentColor" : path.$["android:fillColor"]) : "none",
          "stroke-width": path.$["android:strokeWidth"],
          "stroke": path.$["android:strokeColor"]
            ? !path.$["android:strokeColor"]?.startsWith("#00000000")
              ? "currentColor"
              : path.$["android:strokeColor"]
            : "none",
          "stroke-linecap": path.$["android:strokeLineCap"],
          "stroke-linejoin": path.$["android:strokeLineJoin"],
        };
      }
    }

    const res = builder.buildObject(icon);
    const svg = res.match(/<svg(.|\n)*>(.|\n)*<\/svg>/)[0];
    const { data: optimizedSvg } = optimize(svg, {
      multipass: true,
      floatPrecision: 2,
    });
    const iconName = file.replace(".xml", "").replace("ic_oui_", "");
    fs.writeFileSync(`./icons/${iconName}.svg`, optimizedSvg);
  }
}

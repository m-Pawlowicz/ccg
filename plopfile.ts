import path from "node:path";
import fs from "node:fs";
import type { NodePlopAPI } from "plop";
import { getCompoundComponentGenerator } from "./src/generators/compound-component/generator.ts";
import { getCompoundWithContextGenerator } from "./src/generators/compound-with-context/generator.ts";

const generators = [
  getCompoundComponentGenerator,
  getCompoundWithContextGenerator,
];

export default function (plop: NodePlopAPI) {
  // Register partials - read template content from files
  const partialsDir = path.join(plop.getPlopfilePath(), "src", "partials");

  plop.setPartial(
    "function-start",
    fs.readFileSync(path.join(partialsDir, "function-start.hbs"), "utf8")
  );
  plop.setPartial(
    "function-body",
    fs.readFileSync(path.join(partialsDir, "function-body.hbs"), "utf8")
  );
  plop.setPartial(
    "function-end",
    fs.readFileSync(path.join(partialsDir, "function-end.hbs"), "utf8")
  );
  plop.setPartial(
    "attach-components",
    fs.readFileSync(path.join(partialsDir, "attach-components.hbs"), "utf8")
  );

  // Register generators
  generators.forEach((g) => {
    const { name, config } = g(plop);
    plop.setGenerator(name, config);
  });
}

import path from "node:path";
import type { AddActionConfig, NodePlopAPI, PlopGeneratorConfig } from "plop";

type SetGeneratorPayload = {
  name: string;
  config: PlopGeneratorConfig;
};

export const getCompoundComponentGenerator = (
  plop: NodePlopAPI
): SetGeneratorPayload => {
  return {
    name: "compound",
    config: {
      description: "Generate a compound component",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Compound component name?",
        },
        {
          type: "input",
          name: "components",
          message: "Sub-component names (comma-separated)?",
          filter: function (input: string) {
            return [
              ...new Set(
                input
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              ),
            ];
          },
        },
      ],
      actions: function (data) {
        var actions: AddActionConfig[] = [
          {
            type: "add",
            path: path.join("{{kebabCase name}}", "{{kebabCase name}}.tsx"),
            templateFile: path.join(
              "src",
              "generators",
              "compound-component",
              "templates",
              "compound.hbs"
            ),
          },
          {
            type: "add",
            path: path.join("{{kebabCase name}}", "index.ts"),
            templateFile: path.join(
              "src",
              "generators",
              "compound-component",
              "templates",
              "index.hbs"
            ),
          },
        ];

        // Add an action for each sub-component
        data?.components.forEach(function (component: string) {
          actions.push({
            type: "add",
            path: path.join(
              plop.getHelper("kebabCase")(data.name),
              "parts",
              `${plop.getHelper("kebabCase")(component)}.tsx`
            ),
            templateFile: path.join(
              "src",
              "generators",
              "compound-component",
              "templates",
              "sub-component.hbs"
            ),
            data: { componentName: component },
          });
        });

        return actions;
      },
    },
  };
};

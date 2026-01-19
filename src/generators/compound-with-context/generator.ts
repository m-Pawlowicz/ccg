import path from "node:path";
import type { AddActionConfig, NodePlopAPI, PlopGeneratorConfig } from "plop";

type SetGeneratorPayload = {
  name: string;
  config: PlopGeneratorConfig;
};

export const getCompoundWithContextGenerator = (
  plop: NodePlopAPI,
): SetGeneratorPayload => {
  return {
    name: "context",
    config: {
      description: "Generate a compound component with context",
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
                  .filter(Boolean),
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
              "compound-with-context",
              "templates",
              "compound.hbs",
            ),
          },
          {
            type: "add",
            path: path.join(
              "{{kebabCase name}}",
              "{{kebabCase name}}-context.tsx",
            ),
            templateFile: path.join(
              "src",
              "generators",
              "compound-with-context",
              "templates",
              "context.hbs",
            ),
          },
          {
            type: "add",
            path: path.join("{{kebabCase name}}", "index.ts"),
            templateFile: path.join(
              "src",
              "generators",
              "compound-with-context",
              "templates",
              "index.hbs",
            ),
          },
        ];

        // Add an action for each sub-component
        data?.components.forEach(function (component: string) {
          actions.push({
            type: "add",
            path: path.join(
              "{{kebabCase name}}",
              "parts",
              `{{kebabCase name}}-${plop.getHelper("kebabCase")(component)}.tsx`,
            ),
            templateFile: path.join(
              "src",
              "generators",
              "compound-with-context",
              "templates",
              "sub-component.hbs",
            ),
            data: { componentName: component, parentName: data.name },
          });
        });

        return actions;
      },
    },
  };
};

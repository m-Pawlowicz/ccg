# RCCG - React Compound Component Generator

A CLI tool built with Plop.js to streamline the creation of React compound components using Handlebars templates. Generate compound components with or without context in seconds.

## Usage

### Interactive Mode

Run the CLI without arguments to use the interactive prompts:

```sh
pnpm rccg
```

This will present you with options to choose your generator type and guide you through the configuration.

### Compound

Generates a basic compound component with sub-components.

**Command line:**

```sh
pnpm rccg compound "MyComponent" "Header,Body,Footer"
```

**Interactive:**

```sh
pnpm rccg compound
```

You'll be prompted for:

- Component name
- Sub-component names (comma-separated)

**Generated structure:**

```
my-component/
├── my-component.tsx      # Main compound component
├── index.ts              # Barrel export
└── parts/
    ├── header.tsx        # Sub-component
    ├── body.tsx          # Sub-component
    └── footer.tsx        # Sub-component
```

### Compound Component with Context

Generates a compound component with React Context for sharing state between sub-components.

**Command line:**

```sh
pnpm rccg context "MyComponent" "Header,Body,Footer"
```

**Interactive:**

```sh
pnpm rccg context
```

You'll be prompted for:

- Component name
- Sub-component names (comma-separated)

**Generated structure:**

```
my-component/
├── my-component.tsx      # Main compound component
├── context.tsx           # React Context provider
├── index.ts              # Barrel export
└── parts/
    ├── header.tsx        # Sub-component with context
    ├── body.tsx          # Sub-component with context
    └── footer.tsx        # Sub-component with context
```

## Naming Conventions

- **Folder names**: kebab-case (e.g., `my-component`)
- **File names**: kebab-case (e.g., `my-component.tsx`, `header.tsx`)
- **Component names**: PascalCase (e.g., `MyComponent`, `Header`)

## License

This project is licensed under the MIT License.

# Git Commit Message Standards

Whenever creating or proposing a git commit message, strictly adhere to these standards:

### 1. Format
```text
<type>(<scope>): <imperative description of core edit>

[Optional body for large/context-heavy edits]
- Waarom: <concrete aanleiding, bug of doel>
- Wat: <specifieke functies, interfaces, components of bestanden die zijn gewijzigd>
- Impact: <technische of visuele consequentie, bijv. type-safety, preview binding, rendering>
```

### 2. Commit Types
- `feat`: A new feature, route, or block (e.g. `feat(blocks): add hero banner with visual builder support`)
- `fix`: A bug fix or runtime error correction (e.g. `fix(preview): handle undefined entry in live preview subscriber`)
- `docs`: Documentation updates only (e.g. `docs(agents): update agent guidelines and rules`)
- `style`: UI styling, CSS tweaks, or formatting that does not affect code logic (e.g. `style(header): update navigation link padding and hover transitions`)
- `refactor`: Code restructuring without bug fixes or new features (e.g. `refactor(lib): separate delivery client from page fetcher`)
- `chore`: Configuration, tooling, dependencies, or maintenance (e.g. `chore(tailwind): update postcss configuration`)
- `test`: Adding or updating test cases

### 3. Core Requirements
- **Type Selection**: Carefully verify the nature of changes to pick the exact right type (`chore`, `feat`, `fix`, `docs`, `style`, `refactor`, `test`).
- **Core Edit**: The subject line must capture the single primary change directly in the imperative mood (e.g. "add dynamic block resolver" not "added" or "adds").
- **Scope**: Include the affected component, directory, or module in parentheses when applicable, e.g. `(preview)`, `(blocks)`, `(contentstack)`, `(types)`, `(page)`.
- **Scale (Minor vs. Large)**:
  - **Minor**: Single-line commit message is sufficient.
  - **Large / Multi-file**: Add a concise body explaining key specifics, dependencies, and architectural impact.
- **Context & Specifics**: Always provide short, concrete specifics explaining *why* and *what* was adjusted when changes involve multiple files or configuration subtleties.


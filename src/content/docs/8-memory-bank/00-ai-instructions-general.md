---
title: AI Instructions (General)
description: General Guidelines for AI agents to generate and edit the project documentation.
pubDate: 250413 *(Consistent YYMMDD format)*
draft: 0
---

**Create a project documentation system with two layers:**
1.  A concise `README.md` overview (1 page max)
2.  Detailed component docs in `/memory-bank/` folder (multiple .md files)

**Ensures the Documentation:**
-   Single source of truth (README) + expandable details (memory-bank)
-   Machine-readable structure for AI agents
-   Self-documenting maintenance patterns
-   Minimal cognitive load for developers

**README.md Requirements:**
```markdown
[Project Name] - [1-sentence purpose]

## Core Components
Icon Legend: 🗄️ (Content Collection) | 🔗 (Routing) | 🔧 (Utility) | ... *(Add others as needed)*
- Bullet list of 5-7 main architectural elements
- 1-line description per component, including its icon
- Inter-component Links: The description MUST link to the relevant /memory-bank/ file.
  *Example:* `- 🗄️ Content Parser: Extracts data from source files ([Details](/memory-bank/components-parser.md))`

## Content Collection
- File structure visualization (use `tree` command output format, max 3 levels deep).
- File naming convention rules (as defined below).
- Data relationships diagram (use Mermaid syntax within Markdown ` ```mermaid ... ``` ` blocks, especially if complexity grows).

## URL Slug System
- Flowchart steps for slug generation (text-based: `[Input] → [Step 1 Processing] → [Step 2 Check] → [Output URL]`).
- Special case handling (duplicates, special characters).
- Example conversion: `"My Post!"` → `"/posts/my-post"`

## Getting Started
- Installation: 3-step CLI commands (max).
- Development: Simple 2-environment setup explanation (local/prod).
- Contribution rules: PR checklist bullets (e.g., Linting passed, Docs updated, Tests passed).

## Memory Bank Navigation
- Directory structure: A single `/memory-bank/` folder contains all detailed docs.
- File naming convention: `[type]-[topic].md`
    - `[type]` is one of: `components`, `workflows`, `decisions`.
    - `[topic]` is a short, descriptive name (kebab-case).
    - *Examples:* `components-parser.md`, `workflows-publishing.md`, `decisions-slug-generation-algo.md`
- This flat structure simplifies navigation and link management.
```

**/memory-bank/ File Rules:**
1.  **Single Responsibility:** One component, workflow, or decision per file.
2.  **Mandatory Header Template:**
    ```markdown
    # [Component/Workflow/Decision Name]
    **Category**: [routing | content | utility | workflow | decision] *(Choose one)*
    **Dependencies**: [[component-a]], [/memory-bank/component-b.md](Link to Component B) *(Use wiki-links or standard Markdown links)*
    **Last Updated**: YYMMDD *(e.g., 240516)*

    ## Why
    *Briefly state the problem this solves or its purpose.*
    - Bullet point 1 (max 2 total)
    - Bullet point 2

    ## How
    *Explain the core logic or process.*
    - Use text-based flowcharts for processes: `Step 1 → Step 2 → Decision? → [Yes] Step 3a / [No] Step 3b`
    - Include key configuration snippets or code examples (1 concise block ideally).
    ```markdown
       ```yaml
       # Example relevant config
       setting: value
       ```
    ```

    ## See Also
    - Link to related files in `/memory-bank/` using wiki-links or standard Markdown.
      - [[related-component]]
      - [Decision on X](/memory-bank/decisions-x.md)
    ```
3.  **Prohibited:**
    -   Nested folders within `/memory-bank/`.
    -   File versions in names (use Git history).
    -   Screenshots are strongly discouraged; use only if absolutely essential for clarity and include descriptive alt-text. Prefer text/code/diagrams.

**Writing Guidelines:**
-   Use 🤖 emoji for notes specifically directed at the AI assistant or explaining AI-related processes within the docs.
-   Keep sentences concise (aim for < 15 words).
-   Use version markers like `∆3.1` *within the text* to highlight specific sections affected by major changes (e.g., architectural shifts, API breakages, core logic overhauls documented within).

**Maintenance Protocol:**
1.  **Link Integrity:** All links in `README.md` to `/memory-bank/` files must be valid and point to existing files with matching names. Use automated link checkers if possible.
2.  **Monthly Audit Checklist:**
    -   Identify and remove/archive deprecated components/workflows/decisions (move docs to `/archive/` if keeping historical record).
    -   Verify code snippets in docs against the current codebase.
    -   Update `Last Updated` dates on reviewed/modified files (use `YYMMDD` format).
3.  **Target Audience:** Primarily internal developers. AI agents will also use this structure. Language should be clear, concise, and unambiguous.
4.  **Decision Log Philosophy:** Architectural decisions are captured as `decisions-*.md` files within `/memory-bank/`. The detailed process and context for active decisions may be further elaborated in `03-active-context.md` *(AI Agent: Ensure relevant decisions link back or are referenced here as appropriate)*.

---

This version incorporates your specific choices: `YYMMDD` dates, `🔧` utility icon, `tree` format, Option B file naming (`[type]-[topic].md` in flat `/memory-bank/`), allows both link types, and references the decision log context file. It should provide clear instructions for an AI agent.
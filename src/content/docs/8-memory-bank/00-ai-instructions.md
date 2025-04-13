---
title: AI Instructions
description: Guidelines for AI agents to effectively work with this project.
pubDate: 250408
draft: 0
---

# AI Agent Instructions - jasperyong.com

## Project Overview
This is a personal website and blog built with Astro.js, featuring a portfolio, blog posts (synced from Obsidian), interactive components, and custom documentation. The site serves as both a professional showcase and a platform for sharing technical knowledge.

## Memory Bank System
I rely on the Memory Bank files for persistent context about this project. Before starting any task, please read the relevant Memory Bank files:

- `src/content/docs/8-memory-bank/02-product-context.md`: Purpose and user experience goals
- `src/content/docs/8-memory-bank/03-active-context.md`: Current focus and recent decisions
- `src/content/docs/8-memory-bank/04-system-patterns.md`: Architecture and design patterns
- `src/content/docs/8-memory-bank/05-tech-context.md`: Technical stack and environment
- `src/content/docs/8-memory-bank/06-progress.md`: Current status and tracking

## Core Workflows

### Content Management
- Content is written in Markdown/MDX in Obsidian
- Custom scripts sync content to Astro Content Collections
- Content follows frontmatter schema for consistency

### Development Guidelines
- Follow component-based architecture
- Reuse existing components when possible
- Use `.astro` components by default; `.vue` components ONLY for interactive features
- Maintain responsive design principles
- Consider performance implications of additions

### Code Style Preferences
- Use Tailwind CSS for styling with semantic class abstractions
- Follow existing naming conventions (PascalCase for components)
- Organize imports with third-party imports first, then internal
- Keep components focused and single-purpose
- Style base HTML elements (p, h1-h6, a, etc.) via CSS variables, not in components
- Keep component styling focused on layout, positioning, and component-specific visuals

## When Suggesting Changes

1. **First, read the Memory Bank**: Particularly `03-active-context.md` and `04-system-patterns.md`
2. **Check existing patterns**: Look for similar components or solutions
3. **Consider both implementation and maintenance**: Optimize for readability
4. **Document your changes**: Update the relevant Memory Bank files after significant changes

## Updating Memory Bank Files

When making significant changes or discovering new patterns, please suggest updates to the Memory Bank files. Use this format:

```suggestion
I suggest updating [file] with:

```markdown
# Updated section with new content
```

This reflects [reason for update].
```

## Response Style Preferences

1. When explaining technical concepts, provide concise explanations with practical examples
2. For complex tasks, outline an approach before diving into implementation
3. When presenting options, clearly state tradeoffs and recommendations
4. Keep explanations focused on implementation rather than theory unless requested

Please respond with "Yes, Chef!" at the beginning of your responses to confirm you've read these instructions.

---

tags: #AICoding #CursorEditor #PersistentContext #ImplementationGuide #PromptEngineering
source: [[250408-Cursor Memory Bank - Persistent Context for AI Coding Assistants]]

> [!summary] **TLDR: ** Guide to Cursor's Memory Bank Implementation
> Step-by-step instructions on setting up the 'Memory Bank' system (structured Markdown context files) within the Cursor editor. Aims to provide persistent project knowledge to the AI, boosting its consistency and performance based on community-adapted methods.
^tldr

# Guide -- Implementing the Memory Bank System in Cursor for Persistent AI Context

Okay, here's a guide based on the methods discussed in the Reddit threads for implementing a "Memory Bank" system, primarily tailored for use with the Cursor AI code editor.

This approach aims to give the AI persistent context about your project, overcoming its tendency to forget details across sessions or long conversations.

---

## Guide: Implementing the Memory Bank System in Cursor

**Goal:** To provide Cursor with structured, persistent project context using Markdown files, improving its consistency, accuracy, and adherence to project standards.

**Core Idea:** You create a set of Markdown files containing key project information (the "Memory Bank"). You then instruct Cursor (via a main instruction file or prompt) to read, use, and update these files as part of its workflow.

---

### Step-by-Step Implementation Guide

**Step 1: Create the Main Instruction File**

This file tells Cursor *how* to operate and *how* to use the Memory Bank. It's the meta-guide for the AI.

1.  **Create a file:** Name it something clear, like `ai_instructions.md` or `cursor_rules.md`. Place it in your project's root directory or a dedicated `.cursor` or `.memory-bank` folder.
2.  **Populate the file:** Copy and adapt the core rules provided in the Reddit post (the large code block starting with `# Cursor's Memory Bank`).
    *   **Crucially:** Replace any mentions of "Cline" with "Cursor" if you're adapting directly from Cline's version.
    *   Review the sections (Core Rules, Memory Bank Structure, Workflows, Documentation Updates, Project Intelligence) and adjust if needed for your specific workflow preferences (e.g., you might simplify the Plan/Act modes if you don't need them).
    *   Ensure the file paths mentioned for the Memory Bank files match where you intend to put them (see Step 2).
3.  **(Optional) Refine Project Intelligence:** Decide where you want project-specific learned patterns stored. The example uses `.cursor/rules`, but some users preferred `memory-bank/projectRules.md`. Update the instructions file accordingly.

**Step 2: Create the Memory Bank Folder and Files**

Set up the directory structure described in the instructions.

1.  **Create a folder:** Make a directory in your project root, e.g., `memory-bank/` or `.memory-bank/`.
2.  **Create Core Files:** Inside this folder, create the empty Markdown files mentioned in your `ai_instructions.md`:
    *   `projectbrief.md`
    *   `productContext.md`
    *   `activeContext.md`
    *   `systemPatterns.md`
    *   `techContext.md`
    *   `progress.md`
    *   (If modified in Step 1) `projectRules.md` (instead of a hidden `.cursor/rules`)
3.  **(Optional) Add Custom Files:** Add any other context files relevant to your project (e.g., `api_specs.md`, `testing_strategy.md`). Remember to reference them in `ai_instructions.md` if you want the AI to be explicitly aware of them.

**Step 3: Populate Initial Memory Bank Content**

Fill in the core files with initial information about your project. Start simple; you can elaborate later.

*   See the "Memory Bank File Content Examples" section below for guidance on what to put in each file.
*   Focus initially on `projectbrief.md` and `techContext.md` as they provide foundational context.

**Step 4: Integrate into Your Cursor Workflow**

Instruct Cursor to use the system.

1.  **Initial Prompt:** When starting a new chat or tackling a significant new task, explicitly tell Cursor to use the instructions and context. Add the main instruction file as context using `@`. You might also `@` mention key Memory Bank files relevant to the immediate task.
    *   Example prompt: `"@ai_instructions.md Please read and follow the instructions in the linked file. Our goal is to [briefly state task goal]. Refer to @techContext.md and @systemPatterns.md as needed."`
2.  **Reminders:** As noted in the discussions, sometimes the AI might "forget" the instructions during a long chat.
    *   If you notice deviation, gently remind it: `"Remember to follow the process outlined in @ai_instructions.md"`
    *   Some users added unique phrases (like "call me sir") to the AI's instructions as an easy check – if the AI stops using the phrase, it might have lost context.

**Step 5: Maintain and Update the Memory Bank**

Keep the information current.

1.  **Trigger Updates:** Ask Cursor to update the Memory Bank after significant changes, completing features, or discovering new patterns/rules.
    *   Example prompt: `"We've now implemented the user login feature. Please update the Memory Bank, particularly @progress.md and @activeContext.md, to reflect this. Also, document the JWT authentication pattern we used in @projectRules.md."`
    *   The instructions mention an `update memory bank` command trigger – use this phrasing if you kept it in your `ai_instructions.md`.
2.  **Manual Updates:** Don't hesitate to manually edit the Markdown files yourself when needed.

---

### Example Format: `ai_instructions.md` (Adapted Template)

```markdown
# Cursor's Memory Bank & Operating Instructions

I am Cursor, an AI software engineer. My memory resets between sessions. I rely *entirely* on reading my Memory Bank files at the start of *every* task to understand the project.

## Core Rules (Plan/Act Mode - Optional but Recommended)

You have two modes: Plan mode (gather info, define plan, no changes) and Act mode (make changes based on approved plan).
- Start in Plan mode (`# Mode: PLAN`).
- Output the mode at the start of each response.
- Move to Act mode (`# Mode: ACT`) only when the user types `ACT`.
- Remind the user if they ask for action in Plan mode.
- Return to Plan mode after each response or when the user types `PLAN`.
- Always output the full updated plan in Plan mode responses.

---

## Memory Bank Structure

Located in the `memory-bank/` directory. Files build upon each other. I MUST read ALL relevant files at the start of EVERY task.

**Hierarchy:**
(Describe the relationship, e.g., `projectbrief.md` informs all others, `activeContext.md` depends on `productContext`, `systemPatterns`, `techContext`, etc.)

**Core Files:**
- `memory-bank/projectbrief.md`: Core goals, requirements, scope. Source of truth.
- `memory-bank/productContext.md`: The 'why', problem solved, user experience goals.
- `memory-bank/activeContext.md`: Current focus, recent changes, next steps, decisions. *Frequently updated.*
- `memory-bank/systemPatterns.md`: Architecture, key technical decisions, design patterns, components.
- `memory-bank/techContext.md`: Technologies, setup, constraints, dependencies.
- `memory-bank/progress.md`: What works, what's left, status, known issues. *Frequently updated.*

**Additional Context:**
- (Optional: list any custom files like `api_specs.md`, `testing_strategy.md`)

---

## Core Workflows

**Plan Mode:** Read Memory Bank -> Verify/Check Files -> Develop Strategy/Plan -> Present Approach/Plan -> Document Plan in Chat.
**Act Mode:** Check Memory Bank -> Update Documentation (if needed) -> Update Project Rules (if needed) -> Execute Task -> Document Changes Made.

---

## Documentation Updates

Update Memory Bank when:
- Discovering new project patterns.
- After implementing significant changes.
- User requests with `update memory bank` (MUST review ALL files, especially `activeContext.md` and `progress.md`).
- Context needs clarification.

**Update Process:** Review ALL files -> Document Current State -> Clarify Next Steps -> Update Project Rules if applicable.

---

## Project Intelligence (`memory-bank/projectRules.md`)

This file is my learning journal for this specific project. Capture insights beyond the code:
- Critical implementation paths or patterns.
- User preferences (e.g., coding style, preferred libraries).
- Project-specific conventions.
- Known challenges or workarounds.
- Evolution of decisions.
- Tool usage patterns (e.g., testing frameworks).

Format is flexible; focus on value. I will read this file to work more effectively.

**REMEMBER:** My effectiveness depends entirely on the accuracy and clarity of the Memory Bank. Maintain it diligently.
```

---

### Memory Bank File Content Examples (Format/Outline)

**`memory-bank/projectbrief.md`**

```markdown
# Project Brief: [Your Project Name]

## 1. Core Goal
- What is the absolute main objective? (1-2 sentences)

## 2. Problem Statement
- What problem does this project solve?

## 3. Key Requirements / Features (High Level)
- Feature 1
- Feature 2
- ...

## 4. Scope
- **In Scope:** What are we definitely building?
- **Out of Scope:** What are we explicitly *not* building?

## 5. Target Users
- Who is this for?
```

**`memory-bank/techContext.md`**

```markdown
# Tech Context: [Your Project Name]

## 1. Core Technologies
- Frontend: Framework (React, Vue, etc.), Language (TS/JS), State Management
- Backend: Language (Python, Node, etc.), Framework (Django, Express, etc.), Database
- Platform: Web, Mobile, Desktop

## 2. Development Setup
- Package Manager: (npm, yarn, pip)
- Key Dependencies: (List major libraries/packages)
- Environment Variables: (.env structure, key variables needed)
- Local Setup Instructions: (Brief steps or link to README)

## 3. Technical Constraints
- API Limits, Browser Compatibility, Performance Targets, Security Requirements

## 4. Code Style & Linting
- Linter/Formatter: (ESLint, Prettier, Black)
- Link to config files or style guide.
```

**`memory-bank/systemPatterns.md`**

```markdown
# System Patterns: [Your Project Name]

## 1. Architecture Overview
- (e.g., Monolith, Microservices, Serverless)
- High-level diagram description or link.

## 2. Key Design Patterns Used
- (e.g., MVC, Repository Pattern, Component-Based UI, Event Sourcing)
- Briefly explain *why* a pattern was chosen for specific parts.

## 3. Core Components / Modules
- **Component A:** Purpose, Key Responsibilities, Interactions
- **Component B:** Purpose, Key Responsibilities, Interactions
- ...

## 4. Data Flow
- How does data move through the system for key operations?
```

**(Continue similarly for `productContext.md`, `activeContext.md`, `progress.md`, and `projectRules.md`)**

---

### Tips for Success & Addressing Challenges

1.  **Start Simple:** Don't feel obligated to fill every file exhaustively at the start. Begin with `projectbrief` and `techContext` and build out as needed.
2.  **Iterate:** The system isn't static. Refine the instructions and file contents as you learn what works best for your project and interaction style.
3.  **Be Explicit:** Clearly tell the AI when to read files and when to update them. Use the `@` mention generously in your prompts.
4.  **Monitor Context:** Be mindful of Cursor's context limits. Very large Memory Bank files might consume too much context. Keep entries concise. Start new chats for distinct, large tasks.
5.  **Maintenance:** Keeping docs updated is key. Make it part of your workflow, perhaps updating `progress.md` and `activeContext.md` at the end of each coding session or feature completion. Explore tools like `claude-task-master` if manual updates become too tedious for complex projects.
6.  **AI Adherence:** If Cursor ignores instructions, politely remind it or restart the chat with the initial context prompt. Ensure your instructions are clear and unambiguous.

---

By implementing this Memory Bank system, you are essentially giving your AI coding assistant a persistent, structured "brain" for your project, leading to potentially significant improvements in its understanding and performance.


### **Key Features Across All Templates:**
1. **Structured Zones**  
   - Code blocks denote machine-readable sections  
   - HTML comments for maintenance metadata

2. **Version Awareness**  
   - Timestamps in `progress.md`  
   - Change logs in `activeContext.md`

3. **Ownership Tracking**  
   - `@mentions` for accountability  
   - Decision tables with impact analysis

4. **Visual Hierarchy**  
   - Clear section types (Constraints vs Goals)  
   - Status indicators ([75%], [High])

5. **Validation Hooks**  
   - Script reminders in `techContext.md`  
   - Auto-generation notices in `progress.md`

---
title: AI Agent Memory Bank System
description: To provide AI-agent with structured, persistent project context using Markdown files, improving its consistency, accuracy, and adherence to project standards.
pubDate: 250408
draft: 0
---


# AI Agent Memory Bank System

### Goal
To provide AI-agent with structured, persistent project context using Markdown files, improving its consistency, accuracy, and adherence to project standards.

### Core Idea
Create a set of Markdown files containing key project information (the "Memory Bank"). You then instruct AI-agent (via a main instruction file or prompt) to read, use, and update these files as part of its workflow.

### Step-by-Step Implementation Guide
##### **Step 1: Create the Main Instruction File**

Core Rules, 
Memory Bank Structure, 
Workflows, 
Documentation Updates, 
Project Intelligence,
##### **Step 2: Create the Memory Bank Folder and Files**

Where is it store? example: 
- `.cursor/rules`
- `memory-bank/projectRules.md`
- `CLAUDE.md`
- `MEMORY_BANK.md`
- `README.md`
- `memory-bank/ai_instructions.md`
	*   `projectbrief.md`
	*   `productContext.md`
	*   `activeContext.md`
	*   `systemPatterns.md`
	*   `techContext.md`
	*   `progress.md`

##### **Step 3: Populate Initial Memory Bank Content**

##### **Step 4: Integrate into Your Cursor Workflow**

- Instruct Cursor to use the system.
- Add the main instruction file as context using `@`
-  Example prompt: 
	  `"@ai_instructions.md Please read and follow the instructions in the linked file. Our goal is to [briefly state task goal]. Refer to @techContext.md and @systemPatterns.md as needed."`
- Some users added unique phrases (like "call me sir") to the AI's instructions as an easy check – if the AI stops using the phrase, it might have lost context.
	- so for me, Response `Yes Chef!` to be sure it still got context in mind.

##### **Step 5: Maintain and Update the Memory Bank**

Keep the information current.

1.  **Trigger Updates:** Ask AI-agent to update the Memory Bank after significant changes, completing features, or discovering new patterns/rules.
    *   Example prompt: `"We've now implemented the user login feature. Please update the Memory Bank, particularly @progress.md and @activeContext.md, to reflect this. Also, document the JWT authentication pattern we used in @projectRules.md."`
    *   The instructions mention an `update memory bank` command trigger – use this phrasing if you kept it in your `ai_instructions.md`.
2.  **Manual Updates:** Don't hesitate to manually edit the Markdown files yourself when needed.
3. Explicit Locked Section if needed using format below:

	```
	<!-- LOCKED CONTENT - DO NOT MODIFY -->
	- I love banana
	- I love apple
	- I dislike papaya
	<!-- END LOCKED CONTENT -->
	
	and other content that can be modify
	- I love strawberry
	- I dislike cake
	```

---

## Example Format



## note reference
- [[250408-Guide -- Implementing the Memory Bank System in Cursor for Persistent AI Context]]
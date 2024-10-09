# mywebsite

- [ ] dark mode (BsThemeButton.astro - issue with cross-page)


- [ ] define target audience, primary goals

## 241009
- [ ] tech stack
	- astro.js
	- bootstrap css
	- github-pages
	- github-action
- [ ] features & integration
	- cms: decap cms?
	- analytics tools: google analytics?
	- content management with markdown
	- tag system for the posts
	- assets setup & structure
- [ ] UI/UX Consideration
	- responsive design
	- extra: accessibility?
- [x] link to source code


---
---
---

## Reframing the Project - log into readme.md

### **1. Project Structure with Astro.js**

You will be using a **single repository** and organizing the pages in the `src/pages` directory for `home`, `blog`, `portfolio`, and `playground`. The overall project structure will look like this:

```bash
root/
├── src/
│   ├── pages/
│   │   ├── home/
│   │   │   └── index.astro  # Homepage for jy.com
│   │   ├── blog/
│   │   │   └── index.astro  # Blog page
│   │   ├── portfolio/
│   │   │   └── index.astro  # Portfolio page
│   │   ├── playground/
│   │   │   └── index.astro  # Playground page
│   └── components/
├── public/
├── package.json
└── astro.config.mjs
```

### **2. GitHub Repository and Deployment**

You will use **one GitHub repository** for the entire project. There will be no subdomains, and only **one deployment** to GitHub Pages will be used for the entire website.

**Key steps**:
1. **Single Repository**: Your code for `home`, `blog`, `portfolio`, and `playground` will all live in this one repository.
2. **GitHub Pages Setup**: You will configure the deployment for the main domain (e.g., `jy.com`), and there will be no need to configure subdomains.

### **3. Astro.js Configuration**

In `astro.config.mjs`, no need to configure multiple build outputs. You will set up one build output for the entire site.

Example configuration:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jy.com',
  build: {
    outDir: './dist',
  },
  // Additional settings
});
```

### **Next Steps:**

1. **Set Up Pages**:
   - Create pages for `home`, `blog`, `portfolio`, and `playground` inside the `src/pages` directory.
   
2. **Single Deployment**:
   - Use **GitHub Actions** to automate the deployment to **one GitHub Pages site** for the entire project.
   
3. **DNS Configuration**:
   - Set up your DNS for the single domain `jy.com` (without subdomains).

This setup will streamline the development process and simplify deployment and DNS management.

---
---
---

## content_setup

1. homepage2024
    - have fun with homepage
2. portfolio2024
    - features portfolio & work process
    - downloadable PDF to showcase everything
3. resume2024
    - resume in PDF format
4. blog

## website_development_setup

- terminal + nodejs + npm

- vsc
- figma

- astrojs
- sass
- bootstrapcss

- git
- github actions
- github page

- perplexity.ai
- codeium

## logs

- 240731 - astro-theme-microblog - using it as reference to improve jy-blog
- 240104 - added formspree for receiving guest's messages thru emails
- 231204 - completed setup p5js boilerplate template
- 230821-[Deploy Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)


---


Project Overview
----------------

**Project Name**: (Your project name here) **Purpose and Goals**:  
This project aims to (describe the main purpose of your project). Our primary goals are:

*   (Goal 1)
*   (Goal 2)
*   (Goal 3)

**Key Features**:

*   Feature 1: (Brief description)
*   Feature 2: (Brief description)
*   Feature 3: (Brief description)

Getting Started
---------------

Prerequisites
-------------

Before you begin, ensure you have the following installed:

*   (Required software 1)
*   (Required software 2)
*   (Any other dependencies)

Installation
------------

1.  Clone the repository:```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```
    
2.  Navigate to the project directory:```bash
    cd your-repo-name
    ```
    
3.  Install dependencies:```bash
    npm install  # or yarn install, depending on your package manager
    ```
    

Configuration
-------------

(If your project requires configuration, explain the process here. For example:)

1.  Copy the `.env.example` file to `.env`:```bash
    cp .env.example .env
    ```
    
2.  Open the `.env` file and fill in the required values:```text
    API_KEY=your_api_key_here
    DATABASE_URL=your_database_url_here
    ```
    

Usage Guide
-----------

Basic Commands
--------------

*   To start the application:```bash
    npm start
    ```
    
*   To run tests:```bash
    npm test
    ```
    
*   (Add any other important commands)

Common Use Cases
----------------

1.  **Use Case 1**: (Describe a common use case)```javascript
    // Example code for use case 1
    ```
    
2.  **Use Case 2**: (Describe another use case)```javascript
    // Example code for use case 2
    ```
    

(Add screenshots or more detailed explanations as needed)

API Reference
-------------

(If your project has an API, document its endpoints here. For example:)

GET /api/items
--------------

Retrieves a list of items. **Parameters**:

*   `limit` (optional): Number of items to return (default: 10)

**Response**:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Item 1"
    },
    {
      "id": 2,
      "name": "Item 2"
    }
  ]
}
```

POST /api/items
---------------

Creates a new item. **Request Body**:

```json
{
  "name": "New Item"
}
```

**Response**:

```json
{
  "id": 3,
  "name": "New Item"
}
```

Configuration Options
---------------------

(List and explain any configuration options your project uses. For example:)

*   `DEBUG_MODE`: Set to `true` to enable debug logging
*   `MAX_CONNECTIONS`: Maximum number of concurrent connections (default: 100)

Troubleshooting
---------------

Common Issues
-------------

1.  **Issue**: (Describe a common issue)  
    **Solution**: (Provide the solution)
2.  **Issue**: (Describe another issue)  
    **Solution**: (Provide the solution)

Error Messages
--------------

*   `Error: Connection refused`: This usually means the database is not running. Ensure your database server is started and the connection details in `.env` are correct.

Contributing Guidelines
-----------------------

We welcome contributions to this project! Here's how you can help:

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code adheres to our style guidelines and includes appropriate tests.

License Information
-------------------

This project is licensed under the (Your chosen license, e.g., MIT License). See the [LICENSE](/LICENSE) file for details.

Version History
---------------

*   1.0.0 (YYYY-MM-DD)
    
    *   Initial release
    *   Feature A added
    *   Feature B added
    
*   1.1.0 (YYYY-MM-DD)
    
    *   Bug fix in Feature A
    *   Feature C added
    

This template provides a solid foundation for your project documentation. Remember to replace the placeholder text with specific information about your project. As your project evolves, keep this documentation up-to-date to ensure it remains a valuable resource for users and contributors.

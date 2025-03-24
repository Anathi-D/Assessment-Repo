# Cypress Project Setup Guide
This guide provides all necessary steps to set up a Cypress project with TypeScript and Mochawesome for reporting.
## Prerequisites
- **Node.js** (Recommended: Latest LTS version) → (https://nodejs.org/)
- **npm** or **yarn** (Comes with Node.js)
- **Visual Studio Code** (Optional but recommended)
## Setup Instructions

### 1️⃣ Clone the Project Repository
git clone <your-repository-url>
cd <your-project-folder>

# nitialize the Project (If Not Already Initialized)
npm init -y

# Install Cypress
npm install cypress --save-dev

# Install TypeScript and Required Dependencies (The project is using TypeScript)
npm install typescript @types/node ts-node --save-dev

# nstall Mochawesome for Reports
npm install mochawesome mochawesome-merge mochawesome-report

# To run the project use this command
npx cypress open
npx cypress run (executes test case in the terminal)

# generate reports use this command
npx cypress run --reporter mochawesome (check for the report under the report folder on your project in file explorer)
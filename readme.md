## Installation Guidelines

### 1. Install
npm init playwright@latest
npx playwright install
npm install csv-parse
npm install csv-parse@latest
npm i autocannon -g

### 2. Execution
A. For UI testing
npm playwright test login.demo.spec.ts
npx playwright test login_case2.demo.spec.ts
B. For API testing
npm playwright test apiAuto.demo.spec.ts 
C. For performance API testing
npm playwright test performanceapi.demo.spec.ts

### 3. Explaination
a. for UI use page object model
b. for API just know the design of endpoint api to write automation script
c. for performance test just performance api after write automation api script

## Installation Guidelines

### 1. Install
npm init playwright@latest
npx playwright install
npm install csv-parse
npm install csv-parse@latest
npm i autocannon -g

### 2. Execution
A. For UI testing
npx playwright test login.demo.spec.ts: this scenario is test user can login with valid user name password
npx playwright test login_case2.demo.spec.ts: this scenario is test user cannot login with invalid username, password (edge case)
npx playwright test userplaceOrderwithNoteim.spec.ts: this scenario is test user with no item can place order (edge case)
B. For API testing
npx playwright test apiAuto.demo.spec.ts 
C. For performance API testing
npx playwright test performanceapi.demo.spec.ts (test with concurrent 20 user send request in 60 seconds and check throughput ~ how many requests per time in system)

### 3. Explaination
a. For UI use page object model
b. For API just know the design of endpoint api to write automation script
c. For performance test just performance api after write automation api script
d. For integration ci cd , will write file yaml and work with developer

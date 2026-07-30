import { test, expect, request } from '@playwright/test';
import { Buffer } from 'buffer';

function toBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

test('Simulate 20 users over 1 minute with throughput logging', async () => {
  const baseURL = 'https://api.demoblaze.com';
  const users = Array.from({ length: 20 }, (_, i) => ({
    username: `user_${Date.now()}_${i}`,
    password: 'Password123!'
  }));

  let completedRequests = 0;
  const startTime = Date.now();

  // Log throughput every 5 seconds
  const interval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`Throughput: ${completedRequests} requests in ${elapsed.toFixed(1)}s`);
  }, 5000);

  await Promise.all(users.map(async ({ username, password }, i) => {
    await new Promise(res => setTimeout(res, i * 600));
    const apiContext = await request.newContext({ baseURL });
    const encodedPassword = toBase64(password);

    const signupResponse = await apiContext.post('/signup', { data: { username, password: encodedPassword } });
    completedRequests++;
    console.log(`Signup ${username}:`, await signupResponse.text());

    const loginResponse = await apiContext.post('/login', { data: { username, password: encodedPassword } });
    expect(loginResponse.ok()).toBeTruthy();
    completedRequests++;

    const addCartResponse = await apiContext.post('/addtocart', {
      data: { id: `${username}_${Date.now()}`, cookie: `user=${username}`, flag: true, prod_id: 1 }
    });
    expect(addCartResponse.ok()).toBeTruthy();
    completedRequests++;

    const cartResponse = await apiContext.post('/viewcart', { data: { cookie: `user=${username}` } });
    expect(cartResponse.ok()).toBeTruthy();
    completedRequests++;
  }));

  clearInterval(interval);

  const totalTime = (Date.now() - startTime) / 1000;
  console.log(`Final throughput: ${completedRequests} requests in ${totalTime.toFixed(1)}s`);
  console.log(`Average RPS: ${(completedRequests / totalTime).toFixed(2)} requests/sec`);
});

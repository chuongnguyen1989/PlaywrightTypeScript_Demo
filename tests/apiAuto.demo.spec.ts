import { test, expect, request } from '@playwright/test';

function toBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

test('Demoblaze signup + login + add to cart', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.demoblaze.com'
  });

  const username = `a_new_user_${Date.now()}`;
  const password = 'Password123!';
  const encodedPassword = toBase64(password);

  // 1. Signup with encoded password
  const signupResponse = await apiContext.post('/signup', {
    data: { username, password: encodedPassword }
  });
  console.log('Signup:', await signupResponse.text());

  // 2. Login with same encoding
  const loginResponse = await apiContext.post('/login', {
    data: { username, password: encodedPassword }
  });
  expect(loginResponse.ok()).toBeTruthy();
  console.log('Login:', await loginResponse.text());

  // 3. Add to cart (prod_id = 1)
  const addCartResponse = await apiContext.post('/addtocart', {
    data: {
      id: `${username}_${Date.now()}`,  
      cookie: `user=${username}`,        
      flag: true,
      prod_id: 1                         
    }
  });
  expect(addCartResponse.ok()).toBeTruthy();
  

  // 4. View cart
  const cartResponse = await apiContext.post('/viewcart', {
    data: { cookie: `user=${username}` }
  });
  expect(cartResponse.ok()).toBeTruthy();
 
});

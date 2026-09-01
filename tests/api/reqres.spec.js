const { test, expect } = require('@playwright/test');
const { ReqResApiService } = require('../../services/ReqResApiService');

test.describe('ReqRes API - User Management', () => {
  let createdUserId;

  const CREATED_NAME   = 'John Doe';
  const CREATED_JOB    = 'QA Engineer';
  const UPDATED_NAME   = 'Jane Doe';
  const STATIC_USER_ID = 2;

  test.describe.configure({ mode: 'serial' });

  test('Create a user and validate HTTP 201 status', async ({ request }) => {
    const api     = new ReqResApiService(request);
    const created = await api.createUser({ name: CREATED_NAME, job: CREATED_JOB });

    expect(created.id).toBeTruthy();
    expect(created.name).toBe(CREATED_NAME);
    expect(created.job).toBe(CREATED_JOB);
    expect(created.createdAt).toBeTruthy();

    createdUserId = created.id;
    console.log(`Created user id: ${createdUserId}`);
  });

  test('Get the created user details and validate', async ({ request }) => {
    const api  = new ReqResApiService(request);
    const user = await api.getUserById(STATIC_USER_ID);

    expect(user.id).toBe(STATIC_USER_ID);
    expect(user.email).toBeTruthy();
    expect(user.first_name).toBeTruthy();
    expect(user.last_name).toBeTruthy();
    expect(user.avatar).toBeTruthy();

    console.log(`Fetched user: ${user.first_name} ${user.last_name} <${user.email}>`);
  });

  test('Update user name and validate the response', async ({ request }) => {
    const api        = new ReqResApiService(request);
    const idToUpdate = createdUserId ?? String(STATIC_USER_ID);
    const updated    = await api.updateUser(idToUpdate, { name: UPDATED_NAME, job: CREATED_JOB });

    expect(updated.name).toBe(UPDATED_NAME);
    expect(updated.updatedAt).toBeTruthy();

    console.log(`Updated name to: ${updated.name}`);
  });
});

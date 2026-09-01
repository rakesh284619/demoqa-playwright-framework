const { expect } = require('@playwright/test');

class ReqResApiService {
  constructor(request, baseUrl = 'https://reqres.in') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createUser(payload) {
    const response = await this.request.post(`${this.baseUrl}/api/users`, { data: payload });
    expect(response.status()).toBe(201);
    return await response.json();
  }

  async getUserById(userId) {
    const response = await this.request.get(`${this.baseUrl}/api/users/${userId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    return body.data;
  }

  async updateUser(userId, payload) {
    const response = await this.request.put(`${this.baseUrl}/api/users/${userId}`, { data: payload });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}

module.exports = { ReqResApiService };

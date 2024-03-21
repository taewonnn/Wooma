/** HTTP */
export const http = {
  async get(url: string, config?: any) {
    const res = await fetch(url, {
      ...config,
      method: 'GET',
    });
    const data = await res.json();
    return data;
  },
  async post(url: string, data: any, config?: any) {
    const res = await fetch(url, {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  },
};

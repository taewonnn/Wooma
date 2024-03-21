export const http = {
  async get(url: string, config?: any) {
    const res = await fetch(url, {
      ...config,
      method: 'GET',
    });

    return res;
  },
  async post(url: string, data: any, config?: any) {
    const res = await fetch(url, {
      ...config,
      method: 'POST',
    });
    return res;
  },
};

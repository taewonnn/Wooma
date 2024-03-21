export const http = {
  async get(url: string, config?: any) {
    const res = await fetch.get(url, config);
    return res;
  },
  async post(url: string, data: any) {
    const res = await fetch.post(url, data);
    return res;
  },
};

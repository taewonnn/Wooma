/** 에러 핸들링 함수 */
export function handleError(response: Response) {
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error(`Client error: ${response.status}`);
    } else if (response.status >= 500) {
      throw new Error(`Server error: ${response.status}`);
    }
  }
}

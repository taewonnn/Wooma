/** Id 를 고유색상으로 변경 */
export function idToColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }
  const r = (hash * 70) % 255;
  const g = (hash * 130) % 255;
  const b = (hash * 90) % 255;
  return `rgb(${r}, ${g}, ${b})`;
}

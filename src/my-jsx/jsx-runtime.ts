export function jsx(
  tag: string,
  { children, ...props }: Record<string, unknown>
): string {
  const attr = Object.entries(props)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");

  const innerHTML = Array.isArray(children) ? children.join("") : children;
  return `<${tag}${attr}>${innerHTML}</${tag}>`;
}

export { jsx as jsxs };

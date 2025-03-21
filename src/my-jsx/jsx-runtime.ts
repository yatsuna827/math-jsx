export function jsx(
  tag: string | ((props: Record<string, unknown>) => JSX.Element),
  props: Record<string, unknown>
): string {
  if (typeof tag === "function") {
    return tag(props);
  }

  const { children, ...rest } = props;
  const attr = Object.entries(rest)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");

  const innerHTML = Array.isArray(children) ? children.join("") : children;
  return `<${tag}${attr}>${innerHTML}</${tag}>`;
}

export { jsx as jsxs };

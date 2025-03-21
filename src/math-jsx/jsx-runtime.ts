type TagIntrinsic = keyof JSX.IntrinsicElements;
type TagComponent = (props: Record<string, unknown>) => JSX.Element;

const sum = (nums: number[]) => nums.reduce((p, c) => p + c, 0);
const prod = (nums: number[]) => nums.reduce((p, c) => p * c, 1);

export function jsx(
  tag: TagIntrinsic | TagComponent,
  props: Record<string, unknown>
): JSX.Element {
  if (typeof tag === "function") {
    return tag(props);
  }

  const { children } = props;

  switch (tag) {
    case "sum":
      return Array.isArray(children)
        ? sum(children as number[])
        : (children as number);
    case "prod":
      return Array.isArray(children)
        ? prod(children as number[])
        : (children as number);
    default:
      return NaN;
  }
}

export function Fragment({
  children,
}: {
  children: number | number[];
}): JSX.Element {
  return Array.isArray(children) ? sum(children) : children;
}

export { jsx as jsxs };

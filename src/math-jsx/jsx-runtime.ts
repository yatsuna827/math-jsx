type TagIntrinsic = keyof JSX.IntrinsicElements;
type TagComponent = (props: Record<string, unknown>) => JSX.Element;

export interface MathJSXElement {
  tag: TagIntrinsic | TagComponent;
  props: Record<string, unknown>;
}

interface Operator {
  reduce(nums: number[]): number;
  op: string;
  identity: number;
}
const sum: Operator = {
  reduce: (nums: number[]) => nums.reduce((p, c) => p + c, 0),
  op: "+",
  identity: 0,
};
const prod: Operator = {
  reduce: (nums: number[]) => nums.reduce((p, c) => p * c, 1),
  op: "×",
  identity: 1,
};

export function jsx(
  tag: TagIntrinsic | TagComponent,
  props: Record<string, unknown>
): MathJSXElement {
  return { tag, props };
}

export { jsx as jsxs };

export type Term = number | MathJSXElement | Term[] | null | undefined;

export function Fragment({ children }: { children: Term }): Term {
  return children;
}

function _evaluate(term: Term, op: Operator): number {
  if (Array.isArray(term)) {
    return op.reduce(term.map((t) => _evaluate(t, op)));
  }

  if (typeof term === "number") {
    return term;
  }
  if (term == null) {
    return op.identity;
  }

  const { tag, props } = term;

  if (typeof tag === "function") {
    return _evaluate(tag(props), op);
  }

  const children = props.children as Term;

  switch (tag) {
    case "sum":
      return _evaluate(children, sum);
    case "prod":
      return _evaluate(children, prod);
    default:
      return NaN;
  }
}
export function evaluate(term: Term): number {
  return _evaluate(term, sum);
}

function _render(term: Term, op: Operator): string {
  if (Array.isArray(term)) {
    return `${term
      .map((t) => _render(t, op))
      .filter(Boolean)
      .join(op.op)}`;
  }

  if (typeof term === "number") {
    return `${term}`;
  }
  if (term == null) {
    return "";
  }

  const { tag, props } = term;

  if (typeof tag === "function") {
    const inner = _render(tag(props), op);
    return tag === Fragment && inner ? `(${inner})` : inner;
  }

  const children = props.children as Term;
  if (!Array.isArray(children)) {
    return _render(children, op);
  }

  switch (tag) {
    case "sum": {
      const inner = _render(children, sum);
      return inner ? `(${inner})` : "";
    }
    case "prod": {
      const inner = _render(children, prod);
      return inner ? `(${inner})` : "";
    }
    default:
      return "";
  }
}
export function render(term: Term): string {
  // 一番外側のカッコは省略したい
  if (isFragment(term)) {
    return _render(term.props.children as Term, sum);
  }
  return _render(term, sum);
}
function isFragment(term: Term): term is MathJSXElement {
  if (Array.isArray(term)) return false;
  if (typeof term === "number" || term == null) return false;

  return term.tag === Fragment;
}

import type { MathJSXElement, Term } from "./jsx-runtime";

interface HasChildren {
  children: Term;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sum: HasChildren;
      prod: HasChildren;
    }

    type Element = MathJSXElement;
    type ElementType = "sum" | "prod" | ((props: any) => Term);

    interface ElementChildrenAttribute {
      children: unknown;
    }
  }
}

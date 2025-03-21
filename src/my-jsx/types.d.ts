interface HasChildren {
  children?: string | string[];
}

declare namespace JSX {
  interface IntrinsicElements {
    div: HasChildren & { key?: string };
    h1: HasChildren & { id?: string };
    p: HasChildren;
  }

  type Element = string;

  interface ElementChildrenAttribute {
    children: unknown;
  }
}

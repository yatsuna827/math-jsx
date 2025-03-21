interface HasChildren {
  children: number | number[];
}

declare namespace JSX {
  interface IntrinsicElements {
    sum: HasChildren;
    prod: HasChildren;
  }

  type Element = number;

  interface ElementChildrenAttribute {
    children: unknown;
  }
}

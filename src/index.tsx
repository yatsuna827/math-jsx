type SigmaProps = {
  from: number;
  to: number;
  step?: number;
};
const Sigma = ({ from, to, step = 1 }: SigmaProps): JSX.Element => {
  const children: number[] = [];
  for (let i = from; i <= to; i += step) {
    children.push(i);
  }

  return <sum>{children}</sum>;
};

// (1 + 2 + 3) + (4 * 5)
// = 6 + 20
// = 26
const element = (
  <>
    <Sigma from={1} to={3} />
    <prod>
      {4}
      {5}
    </prod>
  </>
);

console.log(element);

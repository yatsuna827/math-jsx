import { evaluate, render } from "#math-jsx/jsx-runtime";

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

const expression = (
  <>
    <Sigma from={1} to={3} />
    <sum>{10}</sum>
    <prod>
      {/* フラグメントはカッコの役割（評価には影響しない） */}
      <>
        {1}
        {/* 空フラグメントが作れてしまうけど無視される */}
        <></>
        {[1, 2, 3]}
      </>
      {4}
      {5}
    </prod>
  </>
);

console.log(render(expression), "=", evaluate(expression));

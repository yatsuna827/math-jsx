const Title = (props: { children: string }) => <h1>{props.children}</h1>;

const element = (
  <div key="aaa">
    <Title>Hello, world!</Title>
    <h1 id="hello">Hello, world!</h1>
  </div>
);

console.log(element);

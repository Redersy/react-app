import withProviders from "app/providers";
import Button from "shared/ui/Button";
import Input from "shared/ui/Input";

const App = (): JSX.Element => {
  return (
    <>
      <Button>Button</Button>
      <Input defaultValue="value" />
    </>
  );
};

export default withProviders(App);

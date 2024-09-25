import { useAppSelector } from "@/hooks/storeHooks";
import { Providers } from "@/components/Providers/Providers";
import { render } from "@testing-library/react";

let storageString: string;

function MockComponent() {
  const storage = useAppSelector((state) => state.tab);
  storageString = JSON.stringify(storage);
  return <div>MockComponent is rendered. State: {storageString}</div>;
}

describe("Providers component", () => {
  it("renders children inside the Redux Provider", () => {
    const { getByText } = render(
      <Providers>
        <MockComponent />
      </Providers>
    );

    expect(
      getByText(`MockComponent is rendered. State: ${storageString}`)
    ).toBeInTheDocument();
  });
});

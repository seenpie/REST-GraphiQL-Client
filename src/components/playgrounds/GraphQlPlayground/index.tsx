import { Editor, UrlInput } from "./request";
import { ResponseWindow } from "./response";

export function GraphQlPlayground() {
  return (
    <>
      <h1>this graphQl editor</h1>
      <header>
        <UrlInput />
      </header>
      <section>
        <Editor />
      </section>
      <section>
        <ResponseWindow />
      </section>
    </>
  );
}

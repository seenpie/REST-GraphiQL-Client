import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { ComponentProps, useEffect, useRef } from "react";
import { updateSchema, graphql } from "cm6-graphql";
import { useAppSelector } from "@/hooks/storeHooks";
import { selectDocs } from "@/store";
import { json } from "@codemirror/lang-json";

type CodeMirrorProps = ComponentProps<typeof CodeMirror>;

export function RequestEditor(props: CodeMirrorProps) {
  const ref = useRef<ReactCodeMirrorRef>({});
  const docs = useAppSelector(selectDocs);
  const { data: schema } = docs;

  useEffect(() => {
    const { view } = ref.current;

    if (!view || !schema) return;

    updateSchema(view, schema);
  }, [schema]);

  return (
    <CodeMirror
      ref={ref}
      extensions={[graphql(schema || undefined)]}
      {...props}
    />
  );
}

export function ResponseEditor(props: CodeMirrorProps) {
  return (
    <CodeMirror
      extensions={[json()]}
      editable={false}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false
      }}
      {...props}
    />
  );
}

export function MetadataEditor(props: CodeMirrorProps) {
  return <CodeMirror {...props} />;
}

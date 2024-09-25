import { MetadataEditor } from "@/components/playgrounds/graphiql/shared/codemirror";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setVariables } from "@/store";
import classes from "./VariablesTool.module.scss";

export function VariablesTool() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    setInputValue(value);
    dispatch(setVariables(value));
  };

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <span>variables tool</span>
        <button
          type="button"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? "close" : "open"}
        </button>
      </header>

      {isOpen ? (
        <div className={classes.editor}>
          <MetadataEditor value={inputValue} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

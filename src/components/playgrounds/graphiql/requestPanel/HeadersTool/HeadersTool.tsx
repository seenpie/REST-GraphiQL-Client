import { useCallback, useState } from "react";
import { HeadersInput } from "@/components/playgrounds/graphiql/requestPanel/HeadersTool/HeadersInput/HeadersInput";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/hooks/storeHooks";
import { removeHeaders, setHeaders } from "@/store";
import classes from "./HeadersTool.module.scss";

export function HeadersTool() {
  const [tabs, setTabs] = useState<{ id: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const addTab = () => {
    setTabs((prevState) => [...prevState, { id: uuidv4() }]);
    setIsOpen(true);
  };

  const removeTab = (id: string) => {
    setTabs((prevState) => prevState.filter((tab) => tab.id !== id));
    dispatch(removeHeaders(id));
  };

  const updateTab = useCallback(
    (id: string, key: string, value: string) => {
      dispatch(setHeaders({ id, key, value }));
    },
    [dispatch]
  );

  return (
    <>
      <header className={classes.header}>
        <span>headers</span>
        <div>
          <button type="button" onClick={addTab}>
            add tab
          </button>
          <button
            type="button"
            disabled={tabs.length === 0}
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            {isOpen ? "close" : "open"}
          </button>
        </div>
      </header>
      {tabs.length > 0 && isOpen && (
        <ul className={classes.list}>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <HeadersInput
                removeTab={() => removeTab(tab.id)}
                updateTab={(key, value) => updateTab(tab.id, key, value)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

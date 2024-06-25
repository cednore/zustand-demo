import { useEffect } from "react";
import "./App.css";
import useStore from "./store";

function Component1() {
  const selectedEntities = useStore((state) => state.selectedEntities);
  return (
    <div>
      {Object.entries(selectedEntities).map((key, value) => (
        <div>
          {key} : {value}
        </div>
      ))}
    </div>
  );
}

function Component2() {
  const isAreaSelected = useStore.useSel.isAreaSelected();
  return <div>EntityMode subscribed: {`${isAreaSelected}`}</div>;
}

function Component3() {
  const isAreaSelected = useStore.getSel.isAreaSelected();
  return <div>EntityMode unsubscribed: {`${isAreaSelected}`}</div>;
}

function Setter() {
  return (
    <div>
      <button onClick={() => useStore.getState().setEntityMode("areas")}>
        Set to Area
      </button>
      <button onClick={() => useStore.getState().setEntityMode("effects")}>
        Set to Effect
      </button>
    </div>
  );
}

function App() {
  const { setSelectedEntities } = useStore.getState();

  useEffect(() => {
    setSelectedEntities({ a: true, b: false, c: true });
  }, []);

  return (
    <div className="App">
      <Component1 />
      <Component2 />
      <Component3 />
      <Setter />
    </div>
  );
}

export default App;

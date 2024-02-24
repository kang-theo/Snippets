const useList = () => {
  const initialState = [
    { id: 1, name: "qiu" },
    { id: 2, name: "yan" },
    { id: 2, name: "xi" },
  ];

  const [state, setState] = useState(initialState);
  const deleteLi = (index) => {
    setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(index, 1);
      return newState;
    });
  };
  return { state, setState, deleteLi }; //返回查、改、删
};

/*
  自定义 Hooks 通常用于提取和重用与状态管理、副作用、订阅等相关的逻辑，以使组件更加清晰和可复用。
  自定义 Hooks 具有独立的状态，即每个使用自定义 Hooks 的组件都有自己的状态实例。
*/
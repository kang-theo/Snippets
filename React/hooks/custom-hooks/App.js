import React from "react";
import {useList} from "./useLiist";

function App(props) {
  const { state, deleteLi } = useList(); //这里接收return出来的查、删API
  return (
    <ul>
      {state
        ? state.map((v, index) => {
            return (
              <li key={index}>
                {index + "、"}
                {v.name}
                <button
                  onClick={() => {
                    deleteLi(index);
                  }}
                >
                  X
                </button>
              </li>
            );
          })
        : "加载中"}
    </ul>
  );
}
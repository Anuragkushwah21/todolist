import { useEffect, useState } from "react";
import TodoLists from "./TodoLists";

const getLocalItems = () => {
  let list = localStorage.getItem("Lists");
  // console.log(list)
  if (list) {
    return JSON.parse(localStorage.getItem("Lists"));
  } else {
    return [];
  }
};

function TodoList() {
  const [inputList, setInputList] = useState("");
  const [item, setItem] = useState(getLocalItems());

  const itemEvent = (e) => {
    setInputList(e.target.value);
  };

  const listItem = () => {
    setItem((oldItems) => {
      return [...oldItems, inputList];
    });
    setInputList("");
  };
  const deleteItem = (id) => {
    console.log("deleted");
    setItem((oldItems) => {
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>Todo List</h1>
          <br />
          <input
            type="text"
            placeholder="Add Todo"
            value={inputList}
            onChange={itemEvent}
          />
          <button onClick={() => listItem()}>+</button>
          <ol>
            {/* <li>{inputList}</li> */}
            {item.map((items, index) => (
              <TodoLists
                key={index}
                id={index}
                text={items}
                onSelect={deleteItem}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default TodoList;

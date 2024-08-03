import React, { useEffect,useState } from 'react';
import axios from 'axios';

const TodoList = () => {

    const [todoList, setTodoList] = useState([]);
    const [totalLoaded, setTotalLoaded] = useState(0);
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);

    
const listTodo = async() => {
    const res = await axios.get(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
       setTodoList((prevList) => [...prevList,...res.data.todos]);
       setTotalLoaded((prev) => prev + res.data.todos.length);
   

}
    useEffect(()=>{
    listTodo();
    },[skip])

const handleLoadMore = () => {
    if(totalLoaded < 100)
    setSkip(prev => prev + limit);
}

const markAsComplete = (id)=>{
  setTodoList(pretodos => pretodos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)) 
}

return(
    <>
      <h1>TodoList</h1>
      {
        todoList.map((ele,i) => (<li key={ele.id} style={{ textDecoration: ele.completed ? 'line-through' : 'none' }}>
          {ele.id} {''} {ele.todo}
          <button onClick={() => markAsComplete(ele.id)}>
          {ele.completed ? 'Undo' : 'Complete'}
        </button>
        </li>))
      }
      {totalLoaded < 100 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </>
)

}

export default TodoList;
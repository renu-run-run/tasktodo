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


return(
    <>
      <h1>TodoList</h1>
      {
        todoList.map((ele,i) => <ul>
          {ele.id} {''} {ele.todo}
        </ul>)
      }
      {totalLoaded < 100 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </>
)

}

export default TodoList;
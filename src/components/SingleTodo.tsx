import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Todo } from "./model";
import {BiEdit, BiCheckDouble} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai"
import "./styles.css"
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {

    const[edit, setEdit] = useState<boolean>(false);
    const[editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id!==id));
    }
    const handleDone = (id: number) => {
        setTodos(todos.map((todo)=> todo.id===id?{...todo,isDone:!todo.isDone}:todo))
    }

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();

        setTodos(
            todos.map((todo) => (todo.id === id?{...todo, todo:editTodo}:todo))
        )
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      inputRef.current?.focus()},[edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

        {(provided, snapshot) => (
            <form className={`todos__single ${snapshot.isDragging?"drag": "" }`} onSubmit={(e)=>handleEdit(e,todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        
            { edit ? (
                <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text">
                </input>
     
            ):(
                todo.isDone ? (
                    <s className="todos__single--text">
                    {todo.todo}
                </s>
    
                ) : (
                    <span className="todos__single--text">
                    {todo.todo}
                </span>
                    
                )
            )}
            
           
    
            <div>
                <span className="icon" onClick={()=> {
                    if(!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }}>
                    <BiEdit />
                </span>
                <span className="icon" onClick={()=>handleDelete(todo.id)}>
                    <AiTwotoneDelete/>
                </span>
                <span className="icon" onClick={()=>handleDone(todo.id)}>
                    <BiCheckDouble/>
                </span>
            </div>
              </form>
        )}
    </Draggable>
    
  )
}

export default SingleTodo


//@To be integrated into Project
// type Actions =
//     {type: "add"; payload:string} | {type:"remove"; payload:number} | {type:"done"; payload:number};

// const TodoReducer = (state: Todo[],action: Actions) => {
//     switch (action.type) {
//         case"add":return[...state, {id:Date.now(), todo:action.payload, isDone:false}];
//         case"remove":return state.filter((todo) => todo.id !== action.payload);
//         case "done":return state.map((todo) => todo.id !== action.payload ? {...todo, isDone: !todo}:todo)
//         default:return state;
//     }
// };

// const [state, action] = useReducer(TodoReducer, [])
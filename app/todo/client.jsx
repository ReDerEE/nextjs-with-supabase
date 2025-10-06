"use client"
import { createClient } from "@/lib/supabase/client"
import { useRef, useState } from "react"

const supabase = await createClient()

function TodoList({ initialTodos }) {
  const titleRef = useRef("")
  const descriptionRef = useRef("")
  const [todos, setTodos] = useState(initialTodos)

  async function fetchTodos() {
    const { data, error } = await supabase.from("todo").select()
    setTodos(data)
  }

  async function completeButton(id, completed) {
    const { data, error } = await supabase
      .from("todo")
      .update({ completed: !completed })
      .eq("id", id)
    console.log("Updated todo:", data)
    fetchTodos()
  }

  async function deleteButton(id) {
    const response = await supabase.from("todo").delete().eq("id", id)
    console.log("Deleted todo:", id)
    console.log(response)
    fetchTodos()
  }

  async function addTodoButton(title, description) {
    console.log(title, description)
    const { data, error } = await supabase
      .from("todo")
      .insert([{ title: title, description: description }])
      .select()
    titleRef.current.value = ""
    descriptionRef.current.value = ""
    fetchTodos()
  }

  console.log(todos)
  return (
    <>
      <div className="box">
        <input
          ref={titleRef}
          placeholder="Title"
          type="text"
          className="rounded-lg"
        />
      </div>
      <br />
      <div>
        <input
          ref={descriptionRef}
          placeholder="Description"
          type="text"
          className="rounded-lg"
        />
        <br />
        <button
          onClick={() =>
            addTodoButton(titleRef.current.value, descriptionRef.current.value)
          }
          className="bg-purple-700 rounded-lg p-1 mt-2"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-9 px-3 py-3 border border-4">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={
              "bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"
            }
          >
            <div className="font-bold">{todo.title}</div>
            <div className="text-wrap">{todo.description}</div>
            <br />
            <button
              className={
                todo.completed
                  ? "bg-sky-500 hover:bg-sky-700 rounded"
                  : "bg-gray-500 hover:bg-gray-700 rounded"
              }
              onClick={() => completeButton(todo.id, todo.completed)}
            >
              {todo.completed ? "Completed" : "Done?"}
            </button>
            <br />
            <button
              className="bg-red-500 hover:bg-red-700 rounded"
              onClick={() => deleteButton(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default TodoList

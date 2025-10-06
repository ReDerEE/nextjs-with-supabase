import { createClient } from "@/lib/supabase/server"
import TodoList from "./client"

export default async function Page() {
  const supabase = await createClient()
  const { data: todos } = await supabase.from("todo").select()
  console.log(todos)
  

  
  return <TodoList initialTodos = {todos || []}/>
//   return <TodoList/>
}

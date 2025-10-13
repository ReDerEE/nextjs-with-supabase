import { createClient } from "@/lib/supabase/server"
import Books from "./client"

export default async function Page() {
  const supabase = await createClient()
  const { data: books } = await supabase.from("books").select()

  
  return <Books initialBooks = {books || []}/>
//   return <TodoList/>
}

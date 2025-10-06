import { supabase } from "@/lib/supabaseClient";

function TodoItem({ todo }) {

  async function handleComplete() {
    const supabase = await crea
    const { error } = await supabase
      .from("todo")         // Table name
      .update({ is_complete: true })  // Fields to update
      .eq("id", todo.id);   // Filter by todo id

    if (error) {
      console.error("Error updating todo:", error.message);
      return;
    }

    console.log("Todo marked complete");
    // Optionally refresh UI or state here
  }

  return (
    <div>
      <h3>{todo.title}</h3>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
}

"use server"

import { createClient } from "@/lib/supabase/client"

const supabase = await createClient()

export async function sendEdit(id, title, description) {
  const { data, error } = await supabase
    .from("todo")
    .update({ title: title, description: description })
    .eq("id", id)
  console.log("Updated todo:", data)
}

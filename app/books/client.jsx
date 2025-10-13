"use client"
import { createClient } from "../../lib/supabase/client"
import { useRef, useState } from "react"

const supabase = await createClient()

async function initSupabase() {
  const supabase = await createClient()
}

// initSupabase()

function Books({ initialBooks }) {
  const titleRef = useRef("")
  const summaryRef = useRef("")
  const authorRef = useRef("")
  const [books, setBooks] = useState(initialBooks ?? [])
  const [showEditBox, setShowEditBox] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editSummary, setEditSummary] = useState("")
  const [editAuthor, setEditAuthor] = useState("")
  const editTitleRef = useRef("")
  const editSummaryRef = useRef("")
  const editAuthorRef = useRef("")
  const [editId, setEditId] = useState(null)

  async function fetchBooks() {
    const { data, error } = await supabase.from("books").select()
    setBooks(data)
  }

  async function editCancelButton() {
    setEditId(null)
    setEditTitle("")
    setEditSummary("")
    setEditAuthor("")
    setShowEditBox(false)
  }

  async function editSaveButton() {
    const { data, error } = await supabase
      .from("books")
      .update({
        title: editTitleRef.current.value,
        summary: editSummaryRef.current.value,
        author: editAuthorRef.current.value,
      })
      .eq("id", editId)
    console.log("Updated book:", data)
    editCancelButton()
    fetchBooks()
    // console.log(editId, editTitleRef.current.value, editSummaryRef.current.value)
  }

  async function setEditParams(id, title, summary, author) {
    setEditId(id)
    setEditTitle(title)
    setEditSummary(summary)
    setEditAuthor(author)
    setShowEditBox(true)
  }

  async function deleteButton(id) {
    const response = await supabase.from("books").delete().eq("id", id)
    console.log("Deleted book:", id)
    console.log(response)
    fetchBooks()
  }

  async function addBookButton(title, summary, author) {
    console.log(title, summary)
    const { data, error } = await supabase
      .from("books")
      .insert([{ title: title, summary: summary, author: author }])
      .select()
    titleRef.current.value = ""
    summaryRef.current.value = ""
    authorRef.current.value = ""
    fetchBooks()
  }

  console.log(books)
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
          type="text"
          placeholder="Author"
          ref={authorRef}
          className="rounded-lg"
        />
      </div>
      <br />
      <div>
        <input
          ref={summaryRef}
          placeholder="Summary"
          type="text"
          className="rounded-lg"
        />
        <br />
        <button
          onClick={() =>
            addBookButton(
              titleRef.current.value,
              summaryRef.current.value,
              authorRef.current.value,
            )
          }
          className="bg-purple-700 rounded-lg p-1 mt-2"
        >
          Add
        </button>
        {showEditBox && (
          <div id="edit">
            <input
              className="mb-4"
              type="text"
              defaultValue={editTitle}
              ref={editTitleRef}
            />
            <br />
            <input
              type="text"
              ref={editAuthorRef}
              defaultValue={editAuthor}
              className="mb-4"
            />
            <br />
            <textarea
              defaultValue={editSummary}
              ref={editSummaryRef}
            ></textarea>
            <br />
            <button
              className="rounded bg-green-500 mr-3"
              onClick={() => editSaveButton()}
            >
              Save
            </button>
            <button
              className="rounded bg-red-500 ml-3"
              onClick={() => editCancelButton()}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-9 px-3 py-3 border border-4">
        {books.map(book => (
          <div
            id={book.id}
            key={book.id}
            className={
              "bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"
            }
          >
            <div
              data-testid="userBook"
              id="bookTitle"
              className="font-bold"
            >
              {book.title}
            </div>
            <div
              id="bookAuthor"
              className="italic underline"
            >
              {book.author}
            </div>
            <div
              id="bookSummary"
              className="text-wrap"
            >
              {book.summary}
            </div>
            <br />
            <button
              data-testid="deleteButton"
              className="bg-red-500 hover:bg-red-700 rounded"
              onClick={() => deleteButton(book.id)}
            >
              Delete
            </button>
            <br />
            <button
              data-testid="editButton"
              className="rounded bg-gray-500"
              onClick={() =>
                setEditParams(book.id, book.title, book.summary, book.author)
              }
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Books

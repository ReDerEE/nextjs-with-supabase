import { fireEvent, render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Books from "./client"

const initialBooks = [
  {
    id: 1,
    created_at: '2025-10-13T15:38:53.095716+00:00',
    title: 'Great Gatsby',
    summary: 'Some kind of hobbit?',
    author: 'JRR Tolkien'
  },
]

test("Books shows adddition boxes and button", () => {
  render(<Books initialBooks={initialBooks} />)
  expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Summary")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Author")).toBeInTheDocument()
  expect(screen.getByText("Add")).toBeInTheDocument()
})

test("Books shows user book", () => {
  render(<Books initialBooks={initialBooks} />)
  expect(screen.getByTestId("userBook")).toBeInTheDocument()
})

test("Book box renders 'delete', 'edit' buttons correctly", () => {
  render(<Books initialBooks={initialBooks} />)
  expect(screen.getByTestId("deleteButton")).toBeInTheDocument()
  expect(screen.getByTestId("editButton")).toBeInTheDocument()
})


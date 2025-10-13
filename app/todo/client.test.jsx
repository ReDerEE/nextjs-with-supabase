import { fireEvent, render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import TodoList from "./client"

const initialTodo = [
  {
    id: 15,
    created_at: "2025-10-06T12:19:28.532097+00:00",
    title: "test2",
    description: "eteste",
    updated_at: null,
    completed: false,
    deleted: false,
  },
]

test("Todo shows adddition boxes and button", () => {
  render(<TodoList initialTodos={initialTodo} />)
  expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Description")).toBeInTheDocument()
  expect(screen.getByText("Add")).toBeInTheDocument()
})

test("Todo shows user todo", () => {
  render(<TodoList initialTodos={initialTodo} />)
  expect(screen.getByTestId("userTodo")).toBeInTheDocument()
})

test("Todo box renders 'complete', 'delete', 'edit' buttons correctly", () => {
  render(<TodoList initialTodos={initialTodo} />)
  expect(screen.getByTestId("completeButton")).toBeInTheDocument()
  expect(screen.getByTestId("deleteButton")).toBeInTheDocument()
  expect(screen.getByTestId("editButton")).toBeInTheDocument()
})


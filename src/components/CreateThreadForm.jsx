import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "../api/mockApi.js";
import { useToast } from "../context/ToastContext.jsx";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createThread = useMutation({
    mutationFn: (data) => mockApi.createThread(data),
    onSuccess: () => {
      showToast("Thread posted!", "success");
      setTitle("");
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      showToast(message, "error");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    createThread.mutate({ title, body });
  }

  return (
    <section className="panel form-panel" aria-labelledby="create-thread-heading">
      <div className="panel-heading">
        <span className="eyebrow">Share an idea</span>
        <h2 id="create-thread-heading">Start a thread</h2>
        <p>Give your community something to talk about.</p>
      </div>

      <form className="stack-form" onSubmit={handleSubmit}>
        <label htmlFor="thread-title">Thread title</label>
        <input
          id="thread-title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="A thought worth sharing…"
          required
          maxLength={100}
        />

        <label htmlFor="thread-body">What's on your mind?</label>
        <textarea
          id="thread-body"
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Add a little more context (optional)"
          rows={4}
          maxLength={500}
        />

        <button className="primary-button" type="submit" disabled={createThread.isPending}>
          {createThread.isPending ? "Posting…" : "Post thread"}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="form-hint">Try “Welcome to Threadbase” to see an error toast.</p>
      </form>
    </section>
  );
}

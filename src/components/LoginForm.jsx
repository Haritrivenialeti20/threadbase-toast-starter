import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mockApi } from "../api/mockApi.js";
import { useToast } from "../context/ToastContext.jsx";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signedInAs, setSignedInAs] = useState("");
  const { showToast } = useToast();

  const login = useMutation({
    mutationFn: (credentials) => mockApi.login(credentials),
    onSuccess: ({ user }) => {
      setSignedInAs(user.name);
      showToast("Welcome back!", "success");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      showToast(message, "error");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    login.mutate({ username, password });
  }

  return (
    <section className="panel form-panel login-panel" aria-labelledby="login-heading">
      <div className="panel-heading">
        <span className="eyebrow">Good to see you</span>
        <h2 id="login-heading">Log in</h2>
        <p>Your account is waiting right where you left it.</p>
      </div>

      <form className="stack-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="ada"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
        />

        <button className="secondary-button" type="submit" disabled={login.isPending}>
          {login.isPending ? "Signing in…" : "Log in"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="form-hint">Demo credentials: <code>ada</code> / <code>password</code></p>
        {signedInAs && <p className="signed-in-note">Signed in as {signedInAs}</p>}
      </form>
    </section>
  );
}

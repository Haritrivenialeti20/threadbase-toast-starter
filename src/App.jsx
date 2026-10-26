import { useQuery } from "@tanstack/react-query";
import CreateThreadForm from "./components/CreateThreadForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { mockApi } from "./api/mockApi.js";

function RecentThreads() {
  const { data: threads = [], isLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: () => mockApi.getThreads(),
  });

  return (
    <section className="thread-list" aria-labelledby="recent-threads-heading">
      <div className="thread-list-header">
        <div>
          <span className="eyebrow">The conversation</span>
          <h2 id="recent-threads-heading">Recent threads</h2>
        </div>
        <span className="thread-count">{threads.length.toString().padStart(2, "0")}</span>
      </div>
      {isLoading ? (
        <p className="empty-state">Loading threads…</p>
      ) : threads.length ? (
        <ul className="thread-items">
          {threads.map((thread) => (
            <li className="thread-item" key={thread.id}>
              <span className="thread-dot" aria-hidden="true" />
              <div>
                <h3>{thread.title}</h3>
                <p>{thread.body || "A new conversation starts here."}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No threads yet. Post the first one above.</p>
      )}
    </section>
  );
}

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Threadbase home">
          <span className="brand-mark" aria-hidden="true">t</span>
          <span>threadbase</span>
        </a>
        <span className="header-note"><span className="online-dot" /> community is open</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow">A place for good ideas</span>
          <h1>Small thoughts.<br /><em>Big conversations.</em></h1>
          <p>Share what's on your mind, meet people who get it, and make every little moment count.</p>
        </div>
        <div className="hero-stamp" aria-label="Make it a good one">
          <span>MAKE IT</span>
          <strong>A GOOD<br />ONE</strong>
          <span className="stamp-star" aria-hidden="true">✳</span>
        </div>
      </section>

      <div className="section-rule"><span>YOUR COMMUNITY, IN GOOD COMPANY</span></div>

      <div className="content-grid">
        <CreateThreadForm />
        <LoginForm />
      </div>

      <RecentThreads />

      <footer className="site-footer">
        <span>Threadbase</span>
        <span>Every action deserves a little feedback.</span>
      </footer>
    </main>
  );
}

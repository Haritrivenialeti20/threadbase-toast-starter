const threads = [];

function wait(milliseconds = 250) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const mockApi = {
  async getThreads() {
    await wait();
    return threads.map((thread) => ({ ...thread }));
  },

  async createThread({ title, body }) {
    await wait();
    const normalizedTitle = title.trim().toLocaleLowerCase();
    const duplicate =
      normalizedTitle === "welcome to threadbase" ||
      threads.some((thread) => thread.title.toLocaleLowerCase() === normalizedTitle);

    if (duplicate) {
      const error = new Error("A thread with this title already exists");
      error.response = {
        data: { message: "A thread with this title already exists" },
      };
      throw error;
    }

    const thread = {
      id: globalThis.crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };
    threads.unshift(thread);
    return { ...thread };
  },

  async login({ username, password }) {
    await wait();
    if (username.trim().toLowerCase() === "ada" && password === "password") {
      return { user: { username: "ada", name: "Ada Lovelace" } };
    }

    const error = new Error("Invalid username or password");
    error.response = { data: { message: "Invalid username or password" } };
    throw error;
  },
};

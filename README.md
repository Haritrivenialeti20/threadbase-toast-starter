# Threadbase Toast Notification System

A small React/Vite assignment app that demonstrates an app-wide toast system built with React Context and hooks—no toast library or backend required. The mock API simulates thread creation and login requests.

## Run locally

```sh
npm install
npm run dev
```

## Try the flows

- Create a thread with a new title to see a success toast.
- Use the title `Welcome to Threadbase` to simulate the duplicate-title server error.
- Log in with `ada` / `password` for success; any other credentials show a mock API error.
- Click a toast to dismiss it early. Trigger multiple results quickly to see the stack.

Toasts automatically dismiss after three seconds. The UI uses the provided `toast-container`, `toast-success`, `toast-error`, and `toast-info` classes.

## Build

```sh
npm run build
```

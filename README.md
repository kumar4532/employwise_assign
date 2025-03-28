# Project Setup Guide

## Setting Up the Project
Follow these steps to set up the project:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/kumar4532/employwise_assign.git
    cd employwise_assign
    ```

2. **Install Dependencies**:
    Run:
    ```bash
    bun install
    ```

## Running the Project
1. **Start the Development Server**:
    Use the following command to start the server in development mode:
    ```bash
    bun run dev
    ```

2. **Build for Production**:
    To prepare the project for production, run:
    ```bash
    bun run build
    ```

3. **Run in Production Mode**:
    After building, start the production server:
    ```bash
    bun start
    ```

## Considerations made while working
We assume that the backend has a database storing user details and that an API exists to handle user updates. However, since we are working within a frontend-only scope and using a mock API (ReqRes), the updated user details do not persist after a page reload.

# Impact of the Assumption

+ Frontend Implementation: The application successfully updates user details within the current session by modifying state.

+ Navigation: After editing, the user is navigated back to the home page, triggering a fresh API call that retrieves data from the mock API, which does not reflect the updates.

+ Real-World Scenario: If a real database were connected, the updates would be stored and retrieved correctly upon re-fetching the data.

## Deployed Project
[Link](https://employwise-assign.vercel.app/)
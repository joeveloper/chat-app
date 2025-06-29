

## 📘 **Real-Time Chat App – User Stories & Acceptance Criteria**

---

### 🧑‍💼 **User Story 1: User Registration and Login**

**As a** new user,
**I want to** sign up with my email and password,
**So that** I can access the chat app and join rooms.

#### ✅ Acceptance Criteria:

* [ ] The user can access a **Sign Up** form with inputs for username, email, and password.
* [ ] The system validates required fields and shows helpful errors.
* [ ] After successful registration, the user is redirected to the **Sign In** page.
* [ ] The user can log in with valid credentials and is redirected to **/rooms**.
* [ ] Invalid credentials show an appropriate error message.

---

### 🧑‍🤝‍🧑 **User Story 2: Room Management**

**As a** logged-in user,
**I want to** view and create chat rooms,
**So that** I can join conversations relevant to my interests.

#### ✅ Acceptance Criteria:

* [ ] The user sees a list of available rooms after login.
* [ ] If no rooms are available, a message like *"No rooms available. Create one!"* is shown.
* [ ] The user can create a new room by entering a unique name.
* [ ] Newly created rooms appear instantly in the room list.

---

### 💬 **User Story 3: Real-Time Messaging**

**As a** room participant,
**I want to** send and receive messages instantly,
**So that** I can communicate with others in real time.

#### ✅ Acceptance Criteria:

* [ ] Users can type and send messages in a text input field.
* [ ] Messages appear instantly in the UI after sending.
* [ ] Messages from other users arrive in real time (via WebSocket).
* [ ] Messages show the sender's name and the time sent.
* [ ] The sender’s messages are right-aligned, others are left-aligned.

---

### 🔌 **User Story 4: WebSocket Room Handling**

**As a** connected user,
**I want to** only receive messages from the room I joined,
**So that** chats remain relevant and scoped to the current conversation.

#### ✅ Acceptance Criteria:

* [ ] On joining a room, the client emits `joinRoom` with the room ID.
* [ ] Users only receive messages broadcasted to the room they joined.
* [ ] Messages do not leak between rooms.

---

### 🚪 **User Story 5: Logout and Session Handling**

**As a** logged-in user,
**I want to** log out of my account,
**So that** I can protect my session when done.

#### ✅ Acceptance Criteria:

* [ ] There is a visible **Logout** button available from the UI.
* [ ] On logout, all auth tokens (e.g., cookies or localStorage) are cleared.
* [ ] The user is redirected to the **Sign In** page.
* [ ] Trying to access `/rooms` or `/chat/:roomId` without login redirects to **/signin**.



# Opal: A Screen Recording and Collaboration Platform



https://github.com/user-attachments/assets/0e5959b3-286e-4b15-a752-3fd26e490a1c





Opal is a comprehensive application designed to streamline screen recording and video collaboration workflows. It consists of three integrated components: a Next.js web application, an Electron.js-based desktop application, and an Express.js server for video processing.

Problem Statement for Opal:

"Traditional text-based communication and follow-ups in business interactions are often inefficient, leading to miscommunication and lost opportunities. Existing video recording and sharing solutions either rely on third-party libraries, lack real-time engagement features, or are too complex for seamless integration into workflows. There is a need for a streamlined, high-quality video messaging platform that enables users to record, share, and manage videos effortlessly. Opal aims to enhance business communication by providing real-time video recording, AI-powered summaries, collaboration tools, and instant sharing capabilities, improving outreach, engagement, and productivity."

This aligns with Opal’s features and the challenges it solves.

## Features

### Web Application (Next.js)
- **Workspace Management**:
  - Create and manage workspaces.
  - Invite collaborators to workspaces and grow.
- **Folder Organization**:
  - Create and organize folders for video projects.
- **Video Management**:
  - Preview and share videos seamlessly.
- **Real-Time Updates**:
  - Videos recorded on the desktop app are uploaded and updated in real time.

### Desktop Application (Electron.js)
- **Screen Recording**:
  - Capture high-quality screen recordings.
  - Include audio and camera feeds during recording.
- **Real-Time Uploads**:
  - Videos are uploaded to the web app while recording.

### Video Processing Server (Express.js)
- **Video Handling**:
  - Processes and stores videos from the desktop app.
  - Updates video details on the Next.js web application.

---

## Project Repositories

### Web Application
[opal-webprodigies](https://github.com/faiz7077/Opal-web): Contains the Next.js application for video management, video access and collaboration.

### Desktop Application
[opal-electron-desktop-app](https://github.com/faiz7077/Opal-Desktop): Contains the Electron.js desktop app for screen recording and real-time uploads.

### Video Processing Server
[opal-express](https://github.com/faiz7077/Opal-Express): Contains the Express.js server for processing and updating video data.

---

## Usage
1. **Record a Video**:
   - Launch the Electron desktop app to record your screen, audio, and camera feed.
2. **Upload in Real-Time**:
   - Videos are uploaded to the web app as you record.
3. **Manage and Collaborate**:
   - Use the web application to preview, share, and organize videos in workspaces and folders.

---



## Tech Stack

**Client:** Next, Redux, TailwindCSS

**Server:** Node, Express


## Run Locally

Clone the project

```bash
  git clone https://github.com/faiz7077/Opal-web.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  bun install
```

Start the server

```bash
  bun run dev
```

Add env to root of your folder
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_STRIPE_PUBLISH_KEY=



NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/callback

OPEN_AI_KEY=


NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=


MAILER_PASSWORD=
MAILER_EMAIL=
CLOUD_WAYS_POST=

## 🔗 Lets Connect
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)








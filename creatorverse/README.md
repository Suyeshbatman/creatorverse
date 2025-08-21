# WEB103 Prework - *Creatorverse*

Submitted by: **Suyesh Bhatta**

About this web app: **Creatorverse is a React + Supabase CRUD app to showcase my favorite content creators. You can browse, add, edit, and delete creators. Each creator has a name, URL, description, and optional image.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()** (via `@supabase/supabase-js`, which uses `fetch` under the hood)
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] Cosmic background with centered title in a top navbar
- [x] Floating card design (content container without visible frame)
- [x] Keyboard accessibility: cards are focusable; **Enter/Space** triggers navigation to details
- [x] Auto-shrinking one-line titles for long creator names
- [x] Local images served from `/public/images`, plus robust fallback image handling
- [x] Loading and error states for all data fetches
- [x] Clean URL structure and client-side routing with React Router

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace the line above with your actual GIF link.
Recommended tools:
- ScreenToGif (Windows): https://www.screentogif.com/
- Kap (macOS): https://getkap.co/
- peek (Linux): https://github.com/phw/peek
-->

## Notes

- Environment variables: Vite only exposes variables prefixed with `VITE_` (e.g., `VITE_SUPABASE_URL`). The app expects them in `.env.local`.
- Image URLs: Google Images result links won’t work directly; use direct image files or local files from `/public/images`.
- Security: RLS is disabled for prework simplicity. In production, enable RLS and add read/write policies scoped to your needs.
- UI: Used PicoCSS + custom CSS for a cosmic background, floating cards, and a centered brand title.

## License

Copyright [2025] [Suyesh Bhatta]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

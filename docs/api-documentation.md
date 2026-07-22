# Madhur API Documentation & Specifications

## Base URL
`/api/v1`

## Modules & Endpoints Overview

| Module | Route Prefix | Key Responsibilities |
| :--- | :--- | :--- |
| **Auth** | `/api/v1/auth` | User registration, login, JWT token refresh, logout |
| **Users** | `/api/v1/users` | Profile retrieval, settings update, user search |
| **Artists** | `/api/v1/artists` | Artist profile, top tracks, discography |
| **Albums** | `/api/v1/albums` | Album details, tracklist, release metadata |
| **Songs** | `/api/v1/songs` | Track streaming, metadata, play count tracking |
| **Playlists** | `/api/v1/playlists` | Playlist creation, song reordering, public sharing |
| **Search** | `/api/v1/search` | Unified fuzzy search across tracks, artists, albums |
| **Library** | `/api/v1/library` | Liked songs, saved playlists, followed artists |
| **Uploads** | `/api/v1/uploads` | Multer file processing & Cloudinary CDN integration |

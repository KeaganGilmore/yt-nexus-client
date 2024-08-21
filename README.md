# YT Nexus Client

YT Nexus Client is a React-based application that interfaces with the YT Nexus API to search and display YouTube videos based on channel and keyword input. It provides a user-friendly interface for interacting with the YouTube data managed by the YT Nexus backend.

## Features

- Search for videos by channel name and keyword.
- Display video results in an interactive grid layout.
- View video details and play videos directly from the application.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (or yarn)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/yt-nexus-client.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd yt-nexus-client
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will start and open in your default web browser. By default, it runs on `http://localhost:3000`.

### Usage

1. **Enter Channel Name**: Input the YouTube channel name you want to search within.
2. **Enter Keyword**: Provide a keyword to filter the video results.
3. **Click Search**: Press the search button to retrieve and display the videos matching the criteria.

### Folder Structure

- `src/`: Contains all source code.
  - `components/`: Includes reusable React components.
    - `ChannelSearch.js`: Main component for searching and displaying videos.
  - `assets/`: Contains static assets like images.
  - `App.js`: Entry point of the React application.
  - `App.css`: Styles for the application.

### Styling

The application uses modern and minimalistic design principles, ensuring a clean and responsive user experience. Styles are defined in `App.css` and are applied globally across the application.

### API Integration

The client communicates with the YT Nexus API, which should be running locally on port 5000. Make sure the backend server is up and running before starting the client.

### Contact

- **Author**: Keagan Gilmore
- **Email**: [keagangilmore@gmail.com](mailto:keagangilmore@gmail.com)

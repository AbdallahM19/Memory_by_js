# Memory App

The Memory App is a simple web application built using Flask for the backend. It allows users to save memories and view them in a list format with options to delete each memory.

## Features

- **Save Memories:** Users can enter text memories and save them to a local JSON file using the Flask backend.
- **View Memories:** Saved memories are displayed in a list format on the main page.
- **Delete Memories:** Each memory can be deleted individually by clicking a delete button next to it.
- **Dark/Light Mode:** Toggle between dark and light themes for better readability.

## Technologies Used

- **Flask:** Python micro-framework for backend development.
- **HTML/CSS/JavaScript:** Frontend development tools for user interface and interactivity.
- **JSON:** Data storage format for saving and loading memories.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://token@github.com/'{your username}'/Memory_by_js.git
   cd Memory_by_js
   ```

2. **Install Dependencies:**
   ```bash
   pip install flask flask-cors
   ```

3. **Run the Flask Application:**
   ```bash
   python app.py
   ```
   The Flask server will start running on `http://127.0.0.1:5000/`.

4. **Open the Memory Web App:**
   open `http://127.0.0.1:5000/` on your browser

## Usage

- **Adding a Memory:**
  1. Enter text into the text area under "Memories" section.
  2. Click "Save" button to save the memory.
  3. Saved memory will appear in the list below.

- **Deleting a Memory:**
  - Click the "Delete" button next to a memory to remove it from the list.

- **Toggle Dark/Light Mode:**
  - Click the moon icon button in the header to switch between dark and light themes.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
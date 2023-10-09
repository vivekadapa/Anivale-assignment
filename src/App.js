import './App.css';
import { useEffect, useState } from 'react';
import { Card } from './components/Card';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(input);
    fetchImages();
    console.log(images);
  }, []);

  async function fetchImages() {
    try {
      setError(null);
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&pretty=true`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error('Error in fetching details:', error);
      setError('Error fetching images. Please try again.');
    }
  }

  function handleSearch() {
    fetchImages();
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      fetchImages();
    }
  }

  return (
    <div className="App">
      <nav>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Search For Images..."
        />
        <button onClick={handleSearch}>Search</button>
      </nav>
      <main>
        {error ? (
          <p>{error}</p>
        ) : images.length !== 0 ? (
          <div className="grid-container">
            {images.map((image) => {
              return <Card key={image.id} img={image.largeImageURL} />;
            })}
          </div>
        ) : (
          <h1>No images found.</h1>
        )}
      </main>
    </div>
  );
}

export default App;

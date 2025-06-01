
import React, { useState } from "react";
import styles from "./ImageSearchEngine.module.css";

const PIXABAY_API_KEY = "47123049-23e01f6dff4d75db8639e27c8"; // Pixabay API key for searching videos

const ImageSearchEngine = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const UNSPLASH_ACCESS_KEY = "kOovNxGYbH-dW0bcPFgbLqN5PknSqPR0TCvgzYTTB64";

  // Featured nature images
  const featuredImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500",
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=500",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500"
  ];

  const fetchImages = async (searchKeyword, pageNumber) => {
    if (!searchKeyword) return;
    setLoading(true);
    try {
      const url = `https://api.unsplash.com/search/collections?page=${pageNumber}&query=${searchKeyword}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=12`;
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results;
      if (pageNumber === 1) {
        setImages(results);
      } else {
        setImages((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (searchKeyword) => {
    if (!searchKeyword) return;
    try {
      const url = `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchKeyword)}&per_page=10`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.hits) {
        setVideos(data.hits);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchImages(inputValue, 1);
    fetchVideos(inputValue);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(inputValue, nextPage);
  };

  const downloadImage = (imgUrl) => {
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((file) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime().toString();
        a.click();
      })
      .catch(() => alert("Failed to download"));
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className={styles.searchArea}>
        <div className={styles.black}></div>
        <div className={styles.content}>
          <h1>VisualHunt</h1>
          <p>Search and download images and videos within a second</p>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search for nature, wildlife, travel, science..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <div className={styles.btn}>
              <button onClick={handleSearch}>
                <img src="/VisualHunt/search.svg" alt="search" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {images.length > 0 && (
        <div className={styles.imageGallary}>
          <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '24px', fontWeight: 'bold' }}>
            Search Results
          </h2>
          <ul className={styles.images}>
            {images.map((result, index) => (
              <li key={index} className={styles.image}>
                <img
                  src={result.preview_photos[0].urls.small}
                  alt={result.title}
                  className={styles.photo}
                />
                <div className={styles.details}>
                  <div className={styles.user}>
                    <img src="/VisualHunt/camera.svg" alt="camera" />
                    <span>{result.title}</span>
                  </div>
                  <div
                    className={styles.download}
                    onClick={() =>
                      downloadImage(result.preview_photos[0].urls.small)
                    }
                  >
                    <img src="/VisualHunt/download.svg" alt="download" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            id="load"
            className={styles.load}
            style={{ display: loading ? "none" : "block" }}
            onClick={handleLoadMore}
          >
            More
          </button>
        </div>
      )}

      {/* Featured Images Section */}
      <div className={styles.imageGallary}>
        <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '24px', fontWeight: 'bold' }}>
          Featured Nature & Science Images
        </h2>
        <ul className={styles.images}>
          {featuredImages.map((imageUrl, index) => (
            <li key={index} className={styles.image}>
              <img src={imageUrl} alt={`Featured ${index + 1}`} className={styles.photo} />
              <div className={styles.details}>
                <div className={styles.user}>
                  <img src="/VisualHunt/camera.svg" alt="camera" />
                  <span>Featured Image {index + 1}</span>
                </div>
                <div
                  className={styles.download}
                  onClick={() => downloadImage(imageUrl)}
                >
                  <img src="/VisualHunt/download.svg" alt="download" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Results Videos */}
      {videos.length > 0 && (
        <div className={styles.videoGallary}>
          <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '24px', fontWeight: 'bold' }}>
            Video Results
          </h2>
          <ul className={styles.videos}>
            {videos.map((video) => (
              <li key={video.id} className={styles.video}>
                <video
                  controls
                  width="320"
                  height="240"
                  src={video.videos.medium.url}
                  poster={video.webformatURL}
                >
                  Your browser does not support the video tag.
                </video>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageSearchEngine;

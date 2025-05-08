import React, { useState } from "react";
import styles from "./ImageSearchEngine.module.css";

const ImageSearchEngineWithMediaV2 = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const accessKey = "kOovNxGYbH-dW0bcPFgbLqN5PknSqPR0TCvgzYTTB64";

  const fetchImages = async (searchKeyword, pageNumber) => {
    if (!searchKeyword) return;
    setLoading(true);
    try {
      const url = `https://api.unsplash.com/search/collections?page=${pageNumber}&query=${searchKeyword}&client_id=${accessKey}&per_page=12`;
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

  const handleSearch = () => {
    setPage(1);
    fetchImages(inputValue, 1);
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
          <p>Search and download images within a second</p>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Searching images....."
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

      <div className={styles.imageGallary}>
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
        {images.length > 0 && (
          <button
            id="load"
            className={styles.load}
            style={{ display: loading ? "none" : "block" }}
            onClick={handleLoadMore}
          >
            More
          </button>
        )}
      </div>

      {/* New section for static images from VisualHunt */}
      
      {/* New section for videos from VisualHunt */}
      
    </div>
  );
};

export default ImageSearchEngineWithMediaV2;

import React, { useState } from "react";
import styles from "./ImageSearchEngine.module.css";

const ImageSearchEngineWithMedia = () => {
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
      <div className={styles.imageGallary}>
        <ul className={styles.images}>
          <li className={styles.image}><img src="/VisualHunt/visual1.jpg" alt="visual1" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual2.jpg" alt="visual2" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual3.jpg" alt="visual3" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual4.jpg" alt="visual4" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual5.jpg" alt="visual5" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual6.jpg" alt="visual6" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual7.jpg" alt="visual7" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual8.jpg" alt="visual8" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual9.jpg" alt="visual9" className={styles.photo} /></li>
          <li className={styles.image}><img src="/VisualHunt/visual10.jpg" alt="visual10" className={styles.photo} /></li>
        </ul>
      </div>

      {/* New section for videos from VisualHunt */}
      <div className={styles.videoGallary}>
        <ul className={styles.videos}>
          <li className={styles.video}><video src="/VisualHunt/video1.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/video2.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/video3.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/video4.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd5.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd6.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd7.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd8.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd9.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd10.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd11.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd12.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd13.mp4" controls></video></li>
          <li className={styles.video}><video src="/VisualHunt/vd14.mp4" controls></video></li>
        </ul>
      </div>
    </div>
  );
};

export default ImageSearchEngineWithMedia;

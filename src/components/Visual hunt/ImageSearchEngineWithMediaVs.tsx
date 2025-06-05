
import React, { useState } from "react";
import styles from "./ImageSearchEngine.module.css";

const ImageSearchEngineWithMediaV2 = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const accessKey = "kOovNxGYbH-dW0bcPFgbLqN5PknSqPR0TCvgzYTTB64";

  // Static videos data
  const staticVideos = [
    { id: 1, src: "/VisualHunt/video1.mp4", title: "Nature Scene 1" },
    { id: 2, src: "/VisualHunt/video2.mp4", title: "Nature Scene 2" },
    { id: 3, src: "/VisualHunt/video3.mp4", title: "Nature Scene 3" },
    { id: 4, src: "/VisualHunt/video4.mp4", title: "Nature Scene 4" },
    { id: 5, src: "/VisualHunt/vd5.mp4", title: "Visual Hunt 5" },
    { id: 6, src: "/VisualHunt/vd6.mp4", title: "Visual Hunt 6" },
    { id: 7, src: "/VisualHunt/vd7.mp4", title: "Visual Hunt 7" },
    { id: 8, src: "/VisualHunt/vd8.mp4", title: "Visual Hunt 8" },
    { id: 9, src: "/VisualHunt/vd9.mp4", title: "Visual Hunt 9" },
    { id: 10, src: "/VisualHunt/vd10.mp4", title: "Visual Hunt 10" },
    { id: 11, src: "/VisualHunt/vd11.mp4", title: "Visual Hunt 11" },
    { id: 12, src: "/VisualHunt/vd12.mp4", title: "Visual Hunt 12" },
    { id: 13, src: "/VisualHunt/vd13.mp4", title: "Visual Hunt 13" },
    { id: 14, src: "/VisualHunt/vd14.mp4", title: "Visual Hunt 14" },
  ];

  // Static images data
  const staticImages = [
    { id: 1, src: "/VisualHunt/visual1.jpg", title: "Visual 1" },
    { id: 2, src: "/VisualHunt/visual2.jpg", title: "Visual 2" },
    { id: 3, src: "/VisualHunt/visual3.jpg", title: "Visual 3" },
    { id: 4, src: "/VisualHunt/visual4.jpg", title: "Visual 4" },
    { id: 5, src: "/VisualHunt/visual5.jpg", title: "Visual 5" },
    { id: 6, src: "/VisualHunt/visual6.jpg", title: "Visual 6" },
    { id: 7, src: "/VisualHunt/visual7.jpg", title: "Visual 7" },
    { id: 8, src: "/VisualHunt/visual8.jpg", title: "Visual 8" },
    { id: 9, src: "/VisualHunt/visual9.jpg", title: "Visual 9" },
    { id: 10, src: "/VisualHunt/visual10.jpg", title: "Visual 10" },
    { id: 11, src: "/VisualHunt/visual11.jpg", title: "Visual 11" },
    { id: 12, src: "/VisualHunt/img1.jpeg", title: "Image 1" },
  ];

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

      {/* Search results */}
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

      {/* Static Images Section */}
      <div className={styles.imageGallary}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem 0', color: '#0a1e6f' }}>Featured Images</h2>
        <ul className={styles.images}>
          {staticImages.map((image) => (
            <li key={image.id} className={styles.image}>
              <img
                src={image.src}
                alt={image.title}
                className={styles.photo}
              />
              <div className={styles.details}>
                <div className={styles.user}>
                  <img src="/VisualHunt/camera.svg" alt="camera" />
                  <span>{image.title}</span>
                </div>
                <div
                  className={styles.download}
                  onClick={() => downloadImage(image.src)}
                >
                  <img src="/VisualHunt/download.svg" alt="download" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Static Videos Section */}
      <div className={styles.videoGallary}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem 0', color: '#0a1e6f' }}>Featured Videos</h2>
        <ul className={styles.videos}>
          {staticVideos.map((video) => (
            <li key={video.id} className={styles.video}>
              <video controls className={styles.photo}>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageSearchEngineWithMediaV2;

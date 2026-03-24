import { useState, useEffect } from 'react'
import './Carousel.css'

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  return (
    <div className="carousel-container">
      <div 
        className="carousel-inner" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="carousel-content" style={{ background: item.background }}>
              <div className="carousel-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button className="carousel-btn">{item.buttonText}</button>
              </div>
              <div className="carousel-image">
                <img src={item.image} alt={item.title} />
              </div>
              {item.badge && <div className="carousel-badge">{item.badge}</div>}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-indicators">
        {items.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Carousel

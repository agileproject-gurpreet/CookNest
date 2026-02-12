import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getFoodById } from "../../api";
import "./FoodDetail.css";

function FoodDetail({ selectedFoods, onToggleFood, onGoToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isInCart = food && selectedFoods.some(f => f.id === food.id);

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getFoodById(id);
        setFood(data);
      } catch (err) {
        console.error("Failed to fetch food details:", err);
        setError("Failed to load food details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodDetail();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (food) {
      onToggleFood(food);
    }
  }, [food, onToggleFood]);

  const handleBackToMenu = useCallback(() => {
    navigate("/foods");
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="food-detail-container">
        <div className="loading-message">
          <p>Loading food details...</p>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="food-detail-container">
        <div className="error-message">
          <p>{error || "Food item not found"}</p>
          <button onClick={handleBackToMenu} className="back-btn" type="button">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-detail-container">
      <button onClick={handleBackToMenu} className="back-btn-top" type="button">
        <i className="fas fa-arrow-left"></i> Back to Menu
      </button>

      <div className="food-detail-card">
        <div className="food-detail-image-section">
          <div className="food-image-placeholder">
            <i className="fas fa-utensils"></i>
          </div>
        </div>

        <div className="food-detail-content">
          <div className="food-detail-header">
            <div className="food-title-section">
              <h1>{food.name}</h1>
              <div className="food-meta">
                <span className="food-badge">
                  <i className="fas fa-home"></i> Home-Cooked
                </span>
                <span className="food-badge">
                  <i className="fas fa-leaf"></i> Fresh
                </span>
              </div>
            </div>
            <div className="price-section">
              <span className="price-label">Price</span>
              <span className="food-detail-price">₹{food.price}</span>
            </div>
          </div>

          <div className="food-detail-description">
            <h2><i className="fas fa-info-circle"></i> About This Dish</h2>
            <p>{food.description || "A delicious home-cooked meal prepared with love and care. Perfect for any occasion, this dish brings comfort and satisfaction to your table. Made with fresh ingredients and traditional recipes."}</p>
          </div>

          <div className="food-features">
            <div className="feature-item">
              <i className="fas fa-clock"></i>
              <div>
                <strong>Ready to Serve</strong>
                <span>Quick delivery</span>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-heart"></i>
              <div>
                <strong>Made with Love</strong>
                <span>Home-style cooking</span>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>Quality Guaranteed</strong>
                <span>Fresh ingredients</span>
              </div>
            </div>
          </div>

          <div className="food-detail-actions">
            <button
              onClick={handleAddToCart}
              className={`add-to-cart-btn ${isInCart ? "in-cart" : ""}`}
              type="button"
            >
              <i className={`fas ${isInCart ? "fa-check-circle" : "fa-shopping-cart"}`}></i>
              <span>{isInCart ? "Added to Cart" : "Add to Cart"}</span>
            </button>
            {isInCart && (
              <button
                onClick={onGoToCart}
                className="go-to-cart-btn"
                type="button"
              >
                <i className="fas fa-arrow-right"></i>
                <span>Go to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FoodDetail.propTypes = {
  selectedFoods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onToggleFood: PropTypes.func.isRequired,
  onGoToCart: PropTypes.func,
};

export default FoodDetail;

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getFoods } from "../../api";
import Carousel from "../Carousel/Carousel";
import "./FoodList.css";

function FoodList({ selectedFoods, onToggleFood, onGoToCart }) {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const carouselImages = useMemo(() => [
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
  ], []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const data = await getFoods();
        setFoods(data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch foods:", err);
        setError("Failed to load meals. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = useMemo(() => 
    foods.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    [foods, search]
  );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const handleFoodClick = useCallback((foodId) => {
    navigate(`/food/${foodId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="food-list-container">
        <Carousel images={carouselImages} />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading delicious meals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-list-container">
        <Carousel images={carouselImages} />
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-list-container">
      <Carousel images={carouselImages} />
      
      <h2>Available Home-Cooked Meals</h2>

      <div className="controls-container">
        <input
          className="search-input"
          placeholder="Search food..."
          value={search}
          onChange={handleSearchChange}
          aria-label="Search foods"
        />
        
        <div className="controls-right">
          {selectedFoods.length > 0 && (
            <button className="view-cart-btn" onClick={onGoToCart} type="button">
              <i className="fas fa-shopping-cart"></i>
              <span>View Cart ({selectedFoods.length})</span>
            </button>
          )}
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('list')}
              title="List View"
              type="button"
              aria-label="List view"
            >
              <i className="fas fa-list"></i>
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
              title="Grid View"
              type="button"
              aria-label="Grid view"
            >
              <i className="fas fa-th"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'food-grid' : 'food-list'}>
        {filteredFoods.map(food => (
          <div key={food.id} className="food-item">
            <input
              type="checkbox"
              onChange={() => onToggleFood(food)}
              checked={selectedFoods.some(f => f.id === food.id)}
            />
            <div 
              className="food-details" 
              onClick={() => handleFoodClick(food.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFoodClick(food.id);
                }
              }}
            >
              <strong>{food.name}</strong>
              <span className="food-price">₹{food.price}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="place-order-btn"
        disabled={selectedFoods.length === 0}
        onClick={onGoToCart}
        type="button"
      >
        View Cart & Proceed
      </button>
    </div>
  );
}

FoodList.propTypes = {
  selectedFoods: PropTypes.array.isRequired,
  onToggleFood: PropTypes.func.isRequired,
  onGoToCart: PropTypes.func.isRequired,
};

export default FoodList;

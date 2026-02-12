import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import FoodList from "../components/Homepage/FoodList";
import FoodDetail from "../components/FoodDetail/FoodDetail";
import Order from "../components/Cart/Cart";
import Payment from "../components/Payment/Payment";
import OrderHistory from "../components/OrderHistory/OrdersHistory";

// Protected Route wrapper
export const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};

// Route configuration
const routes = (user, handlers) => [
  {
    path: "/",
    element: user ? <Navigate to="/foods" replace /> : <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: user ? (
      <Navigate to="/foods" replace />
    ) : (
      <Login 
        onLogin={handlers.handleLogin}
        onSwitchToRegister={handlers.handleSwitchToRegister}
      />
    ),
  },
  {
    path: "/register",
    element: user ? (
      <Navigate to="/foods" replace />
    ) : (
      <Register onBack={handlers.handleBackToLogin} />
    ),
  },
  {
    path: "/foods",
    element: (
      <ProtectedRoute user={user}>
        <FoodList
          selectedFoods={handlers.selectedFoods}
          onToggleFood={handlers.toggleFood}
          onGoToCart={handlers.handleGoToCart}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/food/:id",
    element: (
      <ProtectedRoute user={user}>
        <FoodDetail
          selectedFoods={handlers.selectedFoods}
          onToggleFood={handlers.toggleFood}
          onGoToCart={handlers.handleGoToCart}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute user={user}>
        <Order
          foods={handlers.selectedFoods}
          onProceedToPayment={handlers.handleProceedToPayment}
          onBackToMenu={handlers.handleBackToMenu}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute user={user}>
        <Payment
          foods={handlers.selectedFoods}
          user={user}
          onPaymentSuccess={handlers.handlePaymentSuccess}
          onBackToCart={handlers.handleBackToCart}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute user={user}>
        <OrderHistory onBack={handlers.handleBackToMenu}
            user={user} />
      </ProtectedRoute>
    ),
  },
];

export default routes;

import AuctionDetails, { loader as auctionDetailsLoader } from './pages/AuctionDetails';
import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';
import Register, { loader as registerLoader } from './pages/Register';
import ROUTERS from '@/constants/route';
import ProductList from '@/pages/ProductList';
import { createBrowserRouter } from 'react-router-dom';
import APIAsyncBoundary from './components/common/boundary/APIAsyncBoundary';
import GlobalAsyncBoundary from './components/common/boundary/GlobalAsyncBoundary';
import RouteErrorBoundary from './components/common/boundary/RouteErrorBoundary';
import PrivateRoute from './components/common/route/PrivateRoute';
import PublicRoute from './components/common/route/PublicRoute';
import GlobalLayout from './components/layout/GlobalLayout';
import LayoutWithNav from './components/layout/LayoutWithNav';
import Heart from './pages/Heart';
import Home from './pages/Home';
import Login from './pages/Login';
import Notification from './pages/Notification';
import PreAuctionDetails, { loader as preAuctionDetailsLoader } from './pages/PreAuctionDetails';
import ProfileEdit from './pages/ProfileEdit';
import Signup from './pages/Signup';
import Test from './pages/Test';
import User from './pages/User';
import OrderHistory from './pages/UserParticipatedList';
import UserRegisteredList from './pages/UserRegisteredList';
import PaymentSuccess from './pages/PaymentSuccess';
import AuctionPayment from './pages/AuctionPayment';
import DeliveryAddressList from './pages/DeliveryAddressList';
import DeliveryAddressAdd from './pages/DeliveryAddressAdd';

const layoutWithNavRouteList = [
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: ROUTERS.NOTIFICATION,
    element: <Notification />,
  },
  {
    path: ROUTERS.HEART,
    element: <Heart />,
  },
  {
    path: ROUTERS.USER,
    element: <User />,
  },
  {
    path: ROUTERS.REGISTERED_LIST,
    element: <UserRegisteredList />,
  },
  {
    path: ROUTERS.PARTICIPATED_LIST,
    element: <OrderHistory />,
  },
];

const privateRouteList = [
  {
    path: ROUTERS.BID,
    element: <Bid />,
    loader: bidLoader,
  },
  {
    path: ROUTERS.FINAL_BIDDER_LIST,
    element: <BidderList />,
    loader: bidderListLoader,
  },
  {
    path: ROUTERS.PROFILE_EDIT,
    element: <ProfileEdit />,
  },
  {
    path: ROUTERS.REGISTER,
    element: <Register />,
  },
  {
    path: `${ROUTERS.PRE_AUCTION.EDIT}/:preAuctionId`,
    element: <Register />,
    loader: registerLoader,
  },
  {
    path: ROUTERS.AUCTION_PAYMENT,
    element: <AuctionPayment />,
  },
  {
    path: ROUTERS.PAYMENT_SUCCESS,
    element: <PaymentSuccess />
  },
  {
    path: ROUTERS.DELIVERY_ADDRESS_LIST,
    element: <DeliveryAddressList />
  },
  {
    path: ROUTERS.DELIVERY_ADDRESS_ADD,
    element: <DeliveryAddressAdd />
  }
];

const publicRouteList = [
  {
    path: ROUTERS.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTERS.LOGIN,
    element: <Login />,
  },
];

export const router = createBrowserRouter([
  {
    // Global Boundary
    element: <GlobalAsyncBoundary>
      <GlobalLayout />
    </GlobalAsyncBoundary>,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        // LayoutWithNav Boundary
        element: (
          <LayoutWithNav />
        ),
        children: layoutWithNavRouteList.map(({ path, element }) => ({
          path,
          element: (
            <APIAsyncBoundary>
              {path === '/' ? element : <PrivateRoute>{element}</PrivateRoute>}
            </APIAsyncBoundary>
          ),
        })),
      },

      ...privateRouteList.map(({ path, element, loader }) => ({
        path,
        element: (
          <PrivateRoute>{element}</PrivateRoute>
        ),
        ...(loader && { loader }),
      })),

      ...publicRouteList.map(({ path, element }) => ({
        path,
        element: <PublicRoute>{element}</PublicRoute>,
      })),

      {
        path: ROUTERS.PRODUCT_LIST,
        element: (
          <ProductList />
        ),
      },
      {
        path: `${ROUTERS.AUCTION.ITEM}/:auctionId`,
        element: (
          <AuctionDetails />
        ),
        loader: auctionDetailsLoader,
      },
      {
        path: `${ROUTERS.PRE_AUCTION.ITEM}/:preAuctionId`,
        element: (
          <PreAuctionDetails />
        ),
        loader: preAuctionDetailsLoader,
      },
      {
        path: `/test`,
        element: <Test />
      },
    ],
  },
]);

export default router;

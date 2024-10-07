import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';
import Register, { loader as registerLoader } from './pages/Register';

import AddressBook from './pages/AddressBook';
import AsyncBoundary from './components/common/loadingAndError/AsyncBoundary';
import AuctionDetails, {
  loader as auctionDetailsLoader,
} from './pages/AuctionDetails';
import GlobalLayout from './components/layout/GlobalLayout';
import Heart from './pages/Heart';
import Home from './pages/Home';
import LayoutWithNav from './components/layout/LayoutWithNav';
import Login from './pages/Login';
import NotFound from './components/common/loadingAndError/NotFound';
import Notification from './pages/Notification';
import OrderHistory from './pages/UserParticipatedList';
import Payment from './pages/Payment';
import PreAuctionDetails, {
  loader as preAuctionDetailsLoader,
} from './pages/PreAuctionDetails';
import PrivateRoute from './components/common/route/PrivateRoute';
import ProductList from '@/pages/ProductList';
import ProfileEdit from './pages/ProfileEdit';
import PublicRoute from './components/common/route/PublicRoute';
import ROUTERS from '@/constants/route';
import Signup from './pages/Signup';
import User from './pages/User';
import UserRegisteredList from './pages/UserRegisteredList';
import { createBrowserRouter } from 'react-router-dom';

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
    path: ROUTERS.ADDRESSBOOK,
    element: <AddressBook />,
  },
  {
    path: ROUTERS.PAYMENT,
    element: <Payment />,
  },
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
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: (
          <AsyncBoundary>
            <LayoutWithNav />
          </AsyncBoundary>
        ),
        children: layoutWithNavRouteList.map(({ path, element }) => ({
          path,
          element: (
            <AsyncBoundary>
              {path === '/' ? element : <PrivateRoute>{element}</PrivateRoute>}
            </AsyncBoundary>
          ),
        })),
      },
      ...privateRouteList.map(({ path, element, loader }) => ({
        path,
        element: (
          <AsyncBoundary>
            <PrivateRoute>{element}</PrivateRoute>
          </AsyncBoundary>
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
          <AsyncBoundary>
            <ProductList />
          </AsyncBoundary>
        ),
      },
      {
        path: `${ROUTERS.AUCTION.ITEM}/:auctionId`,
        element: (
          <AsyncBoundary>
            <AuctionDetails />
          </AsyncBoundary>
        ),
        loader: auctionDetailsLoader,
      },
      {
        path: `${ROUTERS.PRE_AUCTION.ITEM}/:preAuctionId`,
        element: (
          <AsyncBoundary>
            <PreAuctionDetails />
          </AsyncBoundary>
        ),
        loader: preAuctionDetailsLoader,
      },
      {
        path: `${ROUTERS.PAYMENT}/:auctionId`,
      },
    ],
  },
]);

export default router;

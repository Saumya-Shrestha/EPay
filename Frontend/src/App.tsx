import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import UserTable from './pages/UserTable';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Payment System" />
              <FormLayout />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />

        <Route
          path="/paybill"
          element={
            <>
              <PageTitle title="Make Payment" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users" />
              <UserTable />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <PageTitle title="Payment History" />
              <Tables />
            </>
          }
        />
        <Route
          path="/editprofile"
          element={
            <>
              <PageTitle title="Edit Your Profile" />
              <Settings />
            </>
          }
        />
      </Routes >
    </>
  );
}

export default App;

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import mockUser from './mockData.js/mockUser';
import mockFollower from './mockData.js/mockFollower';

const rootUrl = 'https://api.github.com';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState(0);
  const [user, setUser] = useState(mockUser);
  const [follower, setFollower] = useState(mockFollower);
  const [error, setError] = useState({show: false, msg: ''});

  const searchUser = async (user) => {
    setLoading(true);
    try {
      const {data} = await axios(`${rootUrl}/users/${user}`);
      if (data) {
        setUser(data);
        const {followers_url} = data;
        const {data: followerData} = await axios(
          `${followers_url}?per_page=100`
        );
        setFollower(followerData);
      }
    } catch {
      controlError(true, 'there is no user that matched');
    } finally {
      checkRequest();
      setLoading(false);
    }
  };

  const checkRequest = async () => {
    try {
      const {
        data: {
          rate: {remaining},
        },
      } = await axios(`${rootUrl}/rate_limit`);
      setRequest(remaining);
      if (remaining === 0) {
        controlError(true, 'sorry, you have exeeded hourly limit rate');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkRequest();
  }, []);

  const controlError = (show = false, msg = '') => {
    setError({show, msg});
  };

  return (
    <AppContext.Provider
      value={{loading, request, user, follower, error, searchUser}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

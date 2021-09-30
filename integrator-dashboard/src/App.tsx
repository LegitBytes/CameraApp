import { Auth } from "aws-amplify";
// import axios from "axios";  
import React, { useContext, useEffect } from "react"; 
import Navigation from "./Components/Navigation/Navigation";
import { AuthContext } from "./Context/Auth";
import { RouteContext } from "./Context/RouteContext";
import { useHistory } from "react-router-dom";
const App: React.FC = () => {
  const { login } = useContext(AuthContext);
  const { inMemRoute } = useContext(RouteContext);
  const { replace } = useHistory();
  //Checking if user is already logged in or not
  useEffect(() => {
    Auth.currentSession()
      .then(async (data) => {
        if (data) {
          let idToken = data.getIdToken().getJwtToken();
          let cUser = await Auth.currentAuthenticatedUser();
          if (
            data.getAccessToken().payload["cognito:groups"] &&
            data
              .getAccessToken()
              .payload["cognito:groups"].indexOf("AdminGroup") >= 0
          ) {
            login(idToken, cUser.attributes["custom:user_id"], true);
          } else {
            login(idToken, cUser.attributes["custom:integrator_id"], false);
          }
          // axios.defaults.headers.common["AUTHORIZATION"] = idToken;
          replace(inMemRoute);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigation />;
};

export default App;

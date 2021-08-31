import Navigation from "./components/Navigation/Navigation";
import { useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { AuthContext } from "./context/Auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { RouteContext } from "./context/RouteContext";
function App() {
  const { login } = useContext(AuthContext);
  const { inMemRoute } = useContext(RouteContext);
  const { push } = useHistory(); 

  

  //Checking if user is already logged in or not
  useEffect(() => {
    // if (userId) {
      Auth.currentSession()
        .then(async (data) => {
          if (data) {
            console.log("data -> ", data.getAccessToken());
            let idToken = data.getIdToken().getJwtToken();
            let cUser = await Auth.currentAuthenticatedUser();
            console.log("cUser -> ", cUser);
            login(idToken, cUser.attributes["custom:user_id"]);
            axios.defaults.headers.common["AUTHORIZATION"] = idToken;
            push(inMemRoute);
          }
        })
        .catch((err) => console.log(err));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigation />;
}

export default App;

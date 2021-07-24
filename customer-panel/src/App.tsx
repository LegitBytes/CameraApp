import Navigation from "./components/Navigation/Navigation";
import { useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { AuthContext } from "./context/Auth";
import axios from "axios";
function App() {
  const { login } = useContext(AuthContext);
  //Checking if user is already logged in or not
  useEffect(() => {
    Auth.currentSession().then(async (data) => {
      if (data) {
        let idToken = data.getIdToken().getJwtToken();
        let cUser = await Auth.currentAuthenticatedUser()
        login(idToken,cUser.attributes["custom:user_id"]);
        axios.defaults.headers.common["AUTHORIZATION"] = idToken
      }
    })
    .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigation />;
}

export default App;

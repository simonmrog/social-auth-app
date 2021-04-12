import { useState } from "react";
import TwitterLogin from "react-twitter-auth";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import MicrosoftLogin from "react-microsoft-login";


function App() {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const setState = (auth, token, user) => {
    setAuth(auth);
    setToken(token);
    setUser(user);
  }

  const logout = () => setState(false, "", null);

  const fetchToken = async (url, authToken) => {
    const res = await fetch(url, {
      method: "POST",
      body: authToken,
      mode: "cors"
    });
    const accessToken = res.headers.get("accessToken");
    const user = await res.json();
    if (accessToken) setState(true, accessToken, user);
  }

  const twitterResponse = async response => {
    try {
      const accessToken = response.headers.get("accessToken");
      const user = await response.json();
      if (accessToken) setState(true, accessToken, user);
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  };

  const facebookResponse = async response => {
    try {
      const authToken = response.accessToken;
      const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/facebook`;
      await fetchToken(url, authToken);
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  };

  const googleResponse = async response => {
    try {
      const authToken = response.accessToken;
      const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/google`;
      await fetchToken(url, authToken);
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  };

  const microsoftResponse = async (err, response, msal) => {
    try {
      const authToken = response.accessToken;
      const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/microsoft`;
      await fetchToken(url, authToken);
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  };

  const onFailure = (err) => console.error(err.message);

  return (
    <div className="App">
      { isAuth ?
        <div>
          <p>Authenticated</p>
          <div>
            {user.email}
          </div>
          <div>
            <button onClick={logout} className="button">
              Log out
            </button>
          </div>
        </div> :
        <div>
          <TwitterLogin
            loginUrl={`${process.env.REACT_APP_BASE_URL}/api/v1/auth/twitter`}
            onFailure={onFailure}
            onSuccess={twitterResponse}
            requestTokenUrl={`${process.env.REACT_APP_BASE_URL}/api/v1/auth/twitter/callback`}
          />
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={facebookResponse} />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
          <MicrosoftLogin
            clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID}
            authCallback={microsoftResponse}
            redirectUri="http://localhost:3000"
          />
        </div>
      }
    </div>
  );
}

export default App;

import * as React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import Firebase from 'firebase/app';
import 'firebase/auth';

import getGraphQLErrorCode from './getGraphQLErrorCode';

const SessionContext = createContext();

function SessionProvider ({client, children, SessionUser, Loading, popup = true}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [user, _setUser] = useState(new SessionUser(null));

  function setUser (data) {
    const user = new SessionUser(data);
    _setUser(user);
  }


  const useEffectMethod = () => {
    const auth = Firebase.auth();
    console.log(auth);
    const unsubscribe = auth.onAuthStateChanged(async (firebase_user)=> {
      console.log(firebase_user);
      try {
        if (firebase_user) {
          const token = await firebase_user.getIdToken(true);
          console.log("token",token)
          client.setToken(token);
          console.log(SessionUser);
          const user = await SessionUser.load({client, token, firebase_user});
          console.log("user",user)
          setUser(user);
        } else {
          client.clearToken();
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        const code = getGraphQLErrorCode(error);
        if (code) {
          setError(code);
        } else {
          setError('Session error');
        }
      } finally {
        setLoaded(true);
      }
    });

    return ()=> {
      unsubscribe();
    };
  }

  // useEffect(useEffectMethod, []);

  async function start ({email, password, provider: provider_name}) {
    console.log('args', {email, password, provider: provider_name});
    const auth = Firebase.auth();
    const provider_method = popup ? 'signInWithPopup' : 'signInWithRedirect';
    const dedicated_providers = ['Google', 'Facebook', 'Twitter', 'Github'];
    const oauth_providers = ['Yahoo', 'Microsoft', 'Apple'];

    function invalidMode () {
      //throw new Error(`Invalid auth mode: ${provider_name}`);
    }

    let result;
    if (provider_name.includes('Email')) {
      let action;
      if (provider_name === 'EmailSignin') {
        action = 'signInWithEmailAndPassword';
      } else if (provider_name === 'EmailSignup') {
        action = 'createUserWithEmailAndPassword';
      } else {
        invalidMode();
      }

      result = await auth[action](email, password);

      if (action === 'createUserWithEmailAndPassword') {
        result = await auth.currentUser.sendEmailVerification();
      }
    } else if (dedicated_providers.includes(provider_name)) {
      const Provider = Firebase.auth[`${provider_name}AuthProvider`];
      const provider = new Provider();
      result = await auth[provider_method](provider);
    } else if (oauth_providers.includes(provider_name)) {
      const domain = `${provider_name.toLowerCase()}.com`;
      const provider = new Firebase.auth.OAuthProvider(domain);
      result = await auth[provider_method](provider);
    } else {
      invalidMode();
    }
    useEffectMethod();
    return result;
  }

  function end () {
    return Firebase.auth().signOut();
  }

  function reload () {
    // TODO: implement reload
  }

  let $body;
  if (loaded) {
    $body = children({user});
  } else {
    $body = (
      <Loading
        user={user}
        error={error}
        reload={reload}
      />
    );
  }

  return (
    <SessionContext.Provider
      value={{
        loaded,
        error,
        user,
        start,
        reload,
        end
      }}
    >
      {$body}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.func,
  client: PropTypes.object,
  SessionUser: PropTypes.func,
  Loading: PropTypes.func,
  popup: PropTypes.bool
};

const {Consumer: SessionConsumer} = SessionContext;

function useSession () {
  return useContext(SessionContext);
}

function useSessionUser () {
  const session = useSession();
  return session.user;
}

export {
  SessionContext,
  SessionConsumer,
  SessionProvider,
  useSession,
  useSessionUser
};

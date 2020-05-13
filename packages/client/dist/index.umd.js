!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("babel-polyfill"),require("react"),require("prop-types"),require("firebase/app"),require("firebase/auth"),require("lodash.get"),require("graphql-tag"),require("apollo-client"),require("apollo-link-context"),require("apollo-link-http"),require("apollo-cache-inmemory")):"function"==typeof define&&define.amd?define(["exports","babel-polyfill","react","prop-types","firebase/app","firebase/auth","lodash.get","graphql-tag","apollo-client","apollo-link-context","apollo-link-http","apollo-cache-inmemory"],r):r((e=e||self).jumpClient={},0,e.react,e.PropTypes,e.Firebase,0,e.get,e.gql,e.apolloClient,e.apolloLinkContext,e.apolloLinkHttp,e.apolloCacheInmemory)}(this,function(e,r,n,t,o,i,u,a,c,s,l,f){function p(e){var r=u(e,"graphQLErrors[0].extensions.code",null);return r||(r=u(e,"networkError.result.errors[0].extensions.code",null)),r}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o,u=u&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u,a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a;var d=n.createContext();function v(e){var r,t=e.client,i=e.children,u=e.SessionUser,a=e.Loading,c=e.popup,s=void 0===c||c,l=n.useState(!1),f=l[0],v=l[1],m=n.useState(null),E=m[0],y=m[1],P=n.useState(new u(null)),g=P[0],S=P[1];function b(e){var r=new u(e);S(r)}function A(){}return n.useEffect(function(){var e=o.auth().onAuthStateChanged(function(e){try{return Promise.resolve(function(r,n){try{var o=function(r,n){try{var o=function(){var r=function(){if(e)return Promise.resolve(e.getIdToken(!0)).then(function(r){return t.setToken(r),Promise.resolve(u.load({client:t,token:r,firebase_user:e})).then(function(e){b(e)})});t.clearToken(),b(null)}();if(r&&r.then)return r.then(function(){})}()}catch(e){return n(e)}return o&&o.then?o.then(void 0,n):o}(0,function(e){var r=p(e);y(r||"Session error")})}catch(e){return n(!0,e)}return o&&o.then?o.then(n.bind(null,!1),n.bind(null,!0)):n(!1,o)}(0,function(e,r){if(v(!0),e)throw r;return r}))}catch(e){return Promise.reject(e)}});return function(){e()}},[]),r=f?i({user:g}):h(a,{user:g,error:E,reload:A}),h(d.Provider,{value:{loaded:f,error:E,user:g,start:function(e){var r=e.email,n=e.password,t=e.provider;try{var i,u=o.auth(),a=s?"signInWithPopup":"signInWithRedirect",c=["Google","Facebook","Twitter","Github"],l=["Yahoo","Microsoft","Apple"],f=function(){var e;if(t.includes("Email"))return"EmailSignin"===t?e="signInWithEmailAndPassword":"EmailSignup"===t&&(e="createUserWithEmailAndPassword"),Promise.resolve(u[e](r,n)).then(function(r){i=r;var n=function(){if("createUserWithEmailAndPassword"===e)return Promise.resolve(u.currentUser.sendEmailVerification()).then(function(e){i=e})}();if(n&&n.then)return n.then(function(){})});var s=function(){if(c.includes(t)){var e=new(0,o.auth[t+"AuthProvider"]);return Promise.resolve(u[a](e)).then(function(e){i=e})}var r=function(){if(l.includes(t)){var e=t.toLowerCase()+".com",r=new o.auth.OAuthProvider(e);return Promise.resolve(u[a](r)).then(function(e){i=e})}}();if(r&&r.then)return r.then(function(){})}();return s&&s.then?s.then(function(){}):void 0}();return Promise.resolve(f&&f.then?f.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},reload:A,end:function(){return o.auth().signOut()}}},r)}v.propTypes={children:t.func,client:t.object,SessionUser:t.func,Loading:t.func,popup:t.bool};var m=d.Consumer;function E(){return n.useContext(d)}function y(){return(y=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function P(){var e,r,n=(e=["\n      {\n        token @client\n      }\n    "],r||(r=e.slice(0)),e.raw=r,e);return P=function(){return n},n}function g(e){var r=e.Loading,t=e.Error,o=e.match,i=e.client,u=o.params,a=o.route,c=a.page,s=n.useState(!0),l=s[0],f=s[1],p=n.useState(null),d=p[0],v=p[1],m=n.useState(null),E=m[0],P=m[1];return n.useEffect(function(){var e=!1;return function(){try{if(e)return Promise.resolve();if(!c.query)return f(!1),Promise.resolve();var r=function(e,r){try{var n=function(e,r){try{var n=(t=c.query(u),Promise.resolve(i.query(t)).then(function(e){P(e.data)}))}catch(e){return r(e)}var t;return n&&n.then?n.then(void 0,r):n}(0,function(e){v(e)})}catch(e){return r(!0,e)}return n&&n.then?n.then(r.bind(null,!1),r.bind(null,!0)):r(!1,n)}(0,function(e,r){if(f(!1),e)throw r;return r});Promise.resolve(r&&r.then?r.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}(),function(){e=!0}},[]),l?h(r,null):d?h(t,{error:d}):h(c,y({params:u,route:a},E))}g.propTypes={Loading:t.func,Error:t.func,match:t.object,client:t.object};var S={apiKey:process.env.FIREBASE_API_KEY,authDomain:process.env.FIREBASE_AUTH_DOMAIN,databaseURL:process.env.FIREBASE_DATABASE_URL,projectId:process.env.FIREBASE_PROJECT_ID,storageBucket:process.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,appId:process.env.FIREBASE_APP_ID,measurementId:process.env.FIREBASE_MEASUREMENT_ID};e.PageContainer=g,e.SessionConsumer=m,e.SessionContext=d,e.SessionProvider=v,e.firebaseConfig=S,e.getClient=function(e){var r=l.createHttpLink({uri:e.uri}),n=s.setContext(function(e,r){try{var n=r.headers,t=void 0===n?{}:n;return Promise.resolve(function(){try{var e=a(P());return Promise.resolve(o.query({query:e})).then(function(e){return e.data.token})}catch(e){return Promise.reject(e)}}()).then(function(e){return e&&(t.authorization=e?"Bearer "+e:""),{headers:t}})}catch(e){return Promise.reject(e)}}).concat(r),t=new f.InMemoryCache,o=new c.ApolloClient({link:n,cache:t});function i(e){return o.writeData({data:{token:e}})}function u(){return i(null)}return o.setToken=i,o.clearToken=u,u(),o},e.getGraphQLErrorCode=p,e.useSession=E,e.useSessionUser=function(){return E().user}});
//# sourceMappingURL=index.umd.js.map

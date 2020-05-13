import"babel-polyfill";import{createContext as r,useState as n,useEffect as e,useContext as t}from"react";import o from"prop-types";import i from"firebase/app";import"firebase/auth";import u from"lodash.get";import a from"graphql-tag";import{ApolloClient as c}from"apollo-client";import{setContext as s}from"apollo-link-context";import{createHttpLink as l}from"apollo-link-http";import{InMemoryCache as f}from"apollo-cache-inmemory";function v(r){var n=u(r,"graphQLErrors[0].extensions.code",null);return n||(n=u(r,"networkError.result.errors[0].extensions.code",null)),n}var p=r();function m(r){var t,o=r.client,u=r.children,a=r.SessionUser,c=r.Loading,s=r.popup,l=void 0===s||s,f=n(!1),m=f[0],d=f[1],E=n(null),P=E[0],A=E[1],g=n(new a(null)),y=g[0],I=g[1];function S(r){var n=new a(r);I(n)}function b(){}return e(function(){var r=i.auth().onAuthStateChanged(function(r){try{return Promise.resolve(function(n,e){try{var t=function(n,e){try{var t=function(){var n=function(){if(r)return Promise.resolve(r.getIdToken(!0)).then(function(n){return o.setToken(n),Promise.resolve(a.load({client:o,token:n,firebase_user:r})).then(function(r){S(r)})});o.clearToken(),S(null)}();if(n&&n.then)return n.then(function(){})}()}catch(r){return e(r)}return t&&t.then?t.then(void 0,e):t}(0,function(r){var n=v(r);A(n||"Session error")})}catch(r){return e(!0,r)}return t&&t.then?t.then(e.bind(null,!1),e.bind(null,!0)):e(!1,t)}(0,function(r,n){if(d(!0),r)throw n;return n}))}catch(r){return Promise.reject(r)}});return function(){r()}},[]),t=m?u({user:y}):h(c,{user:y,error:P,reload:b}),h(p.Provider,{value:{loaded:m,error:P,user:y,start:function(r){var n=r.email,e=r.password,t=r.provider;try{var o,u=i.auth(),a=l?"signInWithPopup":"signInWithRedirect",c=["Google","Facebook","Twitter","Github"],s=["Yahoo","Microsoft","Apple"],f=function(){var r;if(t.includes("Email"))return"EmailSignin"===t?r="signInWithEmailAndPassword":"EmailSignup"===t&&(r="createUserWithEmailAndPassword"),Promise.resolve(u[r](n,e)).then(function(n){o=n;var e=function(){if("createUserWithEmailAndPassword"===r)return Promise.resolve(u.currentUser.sendEmailVerification()).then(function(r){o=r})}();if(e&&e.then)return e.then(function(){})});var l=function(){if(c.includes(t)){var r=new(0,i.auth[t+"AuthProvider"]);return Promise.resolve(u[a](r)).then(function(r){o=r})}var n=function(){if(s.includes(t)){var r=t.toLowerCase()+".com",n=new i.auth.OAuthProvider(r);return Promise.resolve(u[a](n)).then(function(r){o=r})}}();if(n&&n.then)return n.then(function(){})}();return l&&l.then?l.then(function(){}):void 0}();return Promise.resolve(f&&f.then?f.then(function(){return o}):o)}catch(r){return Promise.reject(r)}},reload:b,end:function(){return i.auth().signOut()}}},t)}m.propTypes={children:o.func,client:o.object,SessionUser:o.func,Loading:o.func,popup:o.bool};var d=p.Consumer;function E(){return t(p)}function P(){return E().user}function A(){return(A=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}return r}).apply(this,arguments)}function g(){var r,n,e=(r=["\n      {\n        token @client\n      }\n    "],n||(n=r.slice(0)),r.raw=n,r);return g=function(){return e},e}function y(r){var n=l({uri:r.uri}),e=s(function(r,n){try{var e=n.headers,t=void 0===e?{}:e;return Promise.resolve(function(){try{var r=a(g());return Promise.resolve(o.query({query:r})).then(function(r){return r.data.token})}catch(r){return Promise.reject(r)}}()).then(function(r){return r&&(t.authorization=r?"Bearer "+r:""),{headers:t}})}catch(r){return Promise.reject(r)}}).concat(n),t=new f,o=new c({link:e,cache:t});function i(r){return o.writeData({data:{token:r}})}function u(){return i(null)}return o.setToken=i,o.clearToken=u,u(),o}function I(r){var t=r.Loading,o=r.Error,i=r.match,u=r.client,a=i.params,c=i.route,s=c.page,l=n(!0),f=l[0],v=l[1],p=n(null),m=p[0],d=p[1],E=n(null),P=E[0],g=E[1];return e(function(){var r=!1;return function(){try{if(r)return Promise.resolve();if(!s.query)return v(!1),Promise.resolve();var n=function(r,n){try{var e=function(r,n){try{var e=(t=s.query(a),Promise.resolve(u.query(t)).then(function(r){g(r.data)}))}catch(r){return n(r)}var t;return e&&e.then?e.then(void 0,n):e}(0,function(r){d(r)})}catch(r){return n(!0,r)}return e&&e.then?e.then(n.bind(null,!1),n.bind(null,!0)):n(!1,e)}(0,function(r,n){if(v(!1),r)throw n;return n});Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(r){return Promise.reject(r)}}(),function(){r=!0}},[]),f?h(t,null):m?h(o,{error:m}):h(s,A({params:a,route:c},P))}I.propTypes={Loading:o.func,Error:o.func,match:o.object,client:o.object};var S={apiKey:process.env.FIREBASE_API_KEY,authDomain:process.env.FIREBASE_AUTH_DOMAIN,databaseURL:process.env.FIREBASE_DATABASE_URL,projectId:process.env.FIREBASE_PROJECT_ID,storageBucket:process.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,appId:process.env.FIREBASE_APP_ID,measurementId:process.env.FIREBASE_MEASUREMENT_ID};export{I as PageContainer,d as SessionConsumer,p as SessionContext,m as SessionProvider,S as firebaseConfig,y as getClient,v as getGraphQLErrorCode,E as useSession,P as useSessionUser};
//# sourceMappingURL=index.esm.js.map

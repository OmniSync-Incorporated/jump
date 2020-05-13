import e from"firebase-admin";import t from"dataloader";import{omit as r,uniq as o,isObject as s,isNumber as n,isFunction as i,merge as a}from"lodash";import{ApolloError as c,ApolloServer as l}from"apollo-server-cloud-functions";import{https as d}from"firebase-functions";import{makeExecutableSchema as u}from"graphql-tools";var h={__proto__:null,isSignedIn:function({context:e}){return!!e.user_id},isPublic:function(){return!0}};function m(e){if(!e)return e;switch(e.constructor.name){case"Array":return e.map(m);case"Object":return Object.keys(e).reduce((t,r)=>(t[r]=m(e[r]),t),{});case"Timestamp":return e.toDate();default:return e}}class f extends c{constructor({code:e="GraphQLError",message:t="GraphQL error",params:r}){t.constructor===Function&&(t=t(r)),super(t,e,r),this.expected=!0}is(e){return this.code===e}}class g extends f{constructor(e){const{type:t,id:r}=e;super({code:"DocumentDoesNotExist",message:`Document ${t} with id ${r} does not exist`,params:e})}}class p extends f{constructor(e){super({code:"ResolverMissing",message:"Resolver missing: "+e.path,params:e})}}class w extends f{constructor(e){super({code:"ResolverAuthorizerMissing",message:"Resolver permission missing: "+e.path,params:e})}}class y extends f{constructor(e){super({code:"NotAuthorized",message:"Not authorized to access "+e.path,params:e})}}class _ extends f{constructor(e){const{code:t,message:r}=e;super({code:"AuthToken",message:`Auth token error ${t}: ${r}`,params:e})}}var x={__proto__:null,GraphQLError:f,DocumentDoesNotExistError:g,ResolverMissingError:p,ResolverAuthorizerMissingError:w,SessionUserNotFoundError:class extends f{constructor(e){super({code:"SessionUserNotFound",message:"Session user not found: "+e.id,params:e})}},NotAuthorizedError:y,AuthTokenError:_};class b{static get(e){return new this(e)}constructor({getCollection:e,getLoader:t}){this.getCollection=e,this.getLoader=t}get name(){throw new Error("Collection child class must implement .name")}get db(){return e.firestore()}get collection(){return this.db.collection(this.name)}doc(e){return this.collection.doc(e)}get loader(){return new t(e=>this.getMany({ids:e}))}async add({data:e}){e=r(e,"id");const t=this._timestampField();e.created_at=t,e.updated_at=t;const o=await this.collection.add(e);return e.id=o.id,e}async set({id:e,data:t,merge:o=!0}){(t=r(t,"id")).updated_at=this._timestampField();const s=this.doc(e);return await s.set(t,{merge:o}),this.get({id:e})}async addOrSetByField({field:e,data:t,add:r=(e=>e)}){const o=t[e],s=await this.findOneByField(e)(o);if(s){const{id:e}=s;return this.set({id:e,data:t})}return t=await r(t),this.add({data:t})}async getOrAddById({id:e,data:t,add:r=(e=>e)}){let o=await this.get({id:e});return o||(t=await r({id:e,data:t}),o=await this.set({id:e,data:t,merge:!1})),o}async exists(e){const t=this.doc(e);return(await t.get()).exists}async get({id:e,assert:t=!1}){const r=this.doc(e),o=await r.get();if(t&&!o.exists)throw this._doesNotExistError(e);return this._snapToDoc(o)}async getMany({ids:e}){if(!e||0===e.length)return[];const t=o(e).map(e=>this.doc(e)),r=(await this.db.getAll(t)).map(e=>this._snapToDoc(e)),s={};for(const e of r)e&&(s[e.id]=e);return e.map(e=>e in s?s[e]:null)}async find({where:e,limit:t,order_by:r,select:o}={}){let i=this.collection;function a(e){throw new Error(`Invalid ${e} for find`)}if(e){let t;s(e)?t=Object.entries(e).map(([e,t])=>[e,"==",t]):Array.isArray(e)?t=Array.isArray(e[0])?e:[e]:a("where");for(const e of t){3!==e.length&&a("where");const[t,r,o]=e;i=i.where(t,r,o)}}return r&&(Array.isArray(r)||(r=[r]),i=i.orderBy(...r)),t&&(n(t)||a("limit"),i=i.limit(t)),o&&(Array.isArray(o)||a("select"),i=i.select(...o)),(await i.get()).docs.map(this._snapToDoc)}async findOne({where:e,order_by:t,select:r}){const o=await this.find({limit:1,where:e,order_by:t,select:r});return o.length>0?o[0]:null}findOneByField(e){return t=>this.findOne({where:[e,"==",t]})}async delete({id:e,ids:t,where:r}){if(e)return this.doc(e).delete();if(t&&r)throw new Error("Delete call should pass ids or where not both");if(r&&(t=(await this.find({where:r})).map(({id:e})=>e)),0===t.length)return Promise.resolve();const o=this.db.batch();for(const e of t){const t=this.doc(e);o.delete(t)}return o.commit()}_timestampField(){return e.firestore.FieldValue.serverTimestamp()}_deleteField(){return e.firestore.FieldValue.delete()}_snapToDoc(e){if(e.exists){const t=e.data();return t.id=e.id,m(t)}return null}_doesNotExistError(e){const t=this.name();return new g({type:t,id:e})}_id(){return this.collection.doc().id}}class v{child(){return this}}const E=["trace","debug","info","warn","error","fatal"];for(const e of E)v.prototype[e]=function(...t){const{console:r}=global;return(e in r?r[e]:r.log).call(r,...t)};class A{constructor({logger:e}={}){e||(e=new v),this.logger=e}get name(){throw new Error("Child class must implement .name")}resolvers(){throw new Error("Child class must implement .resolvers")}collection({context:e,name:t}){return e.getCollection(t||this.name)}loader({context:e,name:t}){return e.getLoader(t||this.name)}expose(){var e=this;const t={},{logger:r}=this,o=this.resolvers();for(const[s,n]of Object.entries(o)){s in t||(t[s]={});for(const[o,a]of Object.entries(n)){const n=`${s}.${o}`;if("__resolveType"===o){t[s][o]=(e,t,r)=>a.call(this,{obj:e,context:t,info:r});continue}const{resolver:c,authorizer:l}=a;if(![c,l].every(i))throw new Error("Invalid resolver definition for "+n);t[s][o]=async function(t,o,s,i){r.debug("Calling resolver "+n);try{if(!c)throw new p({path:n});if(!l)throw new w({path:n});const r={obj:t,args:o,context:s,info:i},{auth_error:a}=s;if(a)throw a;if(!await l.call(e,r))throw new y({path:n});return c.call(e,r)}catch(e){throw e.expected?(r.error(e,"Expected GraphQL error"),e):(r.error(e,"Unexpected GraphQL error"),new f)}}}}return t}get(e){return this.collection(e).get(e.args)}list(e){return this.collection(e).list(e.args)}create(e){const t=this.collection(e),{data:r}=e.args;return t.add(r)}update(e){const t=this.collection(e),{id:r,data:o}=e.args;return t.set({id:r,data:o})}delete(e){const t=this.collection(e),{id:r}=e.args;return t.delete({id:r})}load({collection:e,field:t}){return({obj:r,context:o})=>{const s=o.getLoader(e),n=r[t];return n?s.load(n):null}}loadMany({collection:e,field:t}){return({obj:r,context:o})=>{const s=o.getLoader(e),n=r[t];return n.length?s.loadMany(n):[]}}resolveType(e){return({obj:t,info:r})=>{const o=e(t);return r.schema.getType(o)}}stub(){throw new Error("Unimplemented stub")}}function C(e){const t=e.get("Authorization"),r=/^Bearer /;return t&&t.match(r)?t.replace(r,""):null}function T({Schema:t,Scalars:r,Controllers:o,Collections:s,context:n,getToken:i=C,user_collection:c="User",options:h={}}){n||(n=function({Collections:t,getToken:r,user_collection:o}){return async({req:s})=>{const n={};function i(e){const t=e.name||e;if(!(t in n)){const e=a(t);n[t]=e.loader}return n[t]}function a(e){const r=e.name||e,o=t[r];if(!o)throw new Error(`Collection with name ${r} does not exist`);return o.get({getCollection:a,getLoader:i})}let c=null,l=null,d=null;const u=r(s);if(u)try{const t=a(o);c=await async function(t){try{const r=e.auth();return(await r.verifyIdToken(t)).uid}catch(e){const{code:t,message:r}=e;throw new _({code:t,message:r})}}(u),l=await t.get({id:c})}catch(e){d=e}return{getCollection:a,getLoader:i,auth_error:d,token:u,user_id:c,user:l}}}({Collections:s,getToken:i,user_collection:c}));const m=function({Schema:e,Controllers:t,Scalars:r}){const o={};for(const[e,r]of Object.entries(t)){console.log("Exposing controller "+e);const t=new r;a(o,t.expose())}return a(o,r),u({typeDefs:e,resolvers:o})}({Schema:t,Controllers:o,Scalars:r}),f=new l({schema:m,context:n}).createHandler(h);return d.onRequest(f)}function D({getServiceAccount:t}){const r=t(process.env.NODE_ENV),o=e.credential.cert(r),{project_id:s}=r;e.initializeApp({credential:o,databaseURL:`https://${s}.firebaseio.com`})}export{h as Authorizers,b as Collection,A as Controller,x as Errors,C as getToken,T as graphqlHandler,D as initializeFirebase};
//# sourceMappingURL=index.modern.js.map

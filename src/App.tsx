
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route} from "react-router-dom" 

export function App() {
  return (
    <BrowserRouter forceRefresh>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </BrowserRouter>
  );
}

//import { AuthContextProvider } from './contexts/authContext'

// <AuthContextProvider>
// <Route path="/" exact component={Home} />
// <Route path="/rooms/new" component={NewRoom} />
// /AuthContextProvider>


//------------------------------FIREBASE--------------------------------------

// import firebase from 'firebase/app'

// import 'firebase/auth'
// import 'firebase/database'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

// firebase.initializeApp(firebaseConfig)

// const auth = firebase.auth()
// const database = firebase.database()

// export {firebase, auth, database}

//-------------------------------CONTEXTS---------------------------------------

// import { createContext, ReactNode, useEffect, useState } from "react"
// //import { auth, firebase } from "../services/firebase"

// type User = {
//     id: string;
//     name: string;
//     avatar: string;
// }

// type AuthContextType = {
//     user: User | undefined;
//     signInWithGoogle: () => Promise<void>
// }

// type AuthContextProviderProps = {
//     children: ReactNode
// }

// export const AuthContext = createContext({} as AuthContextType)

// export function AuthContextProvider( props: AuthContextProviderProps ) {

//     const [user, setUser] = useState<User>()

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//         if(user) {
//           const { displayName, photoURL, uid } = user
    
//           if (!displayName || !photoURL) {
//             throw new Error('Missing information from Google Account.')
//           }
    
//           setUser({
//             id: uid,
//             name: displayName,
//             avatar: photoURL
//           })
//         }
//       })

//       return () => {
//           unsubscribe()
//       }
//     }, [] )
  
//     async function signInWithGoogle() {
//       const provider = new firebase.auth.GoogleAuthProvider()
  
//       const result = await auth.signInWithPopup(provider)
  
//       if(result.user) {
//         const { displayName, photoURL, uid } = result.user
  
//         if (!displayName || !photoURL) {
//           throw new Error('Missing information from Google Account.')
//         }
  
//         setUser({
//           id: uid,
//           name: displayName,
//           avatar: photoURL
//         })
//       }
//     }

//     return (
//         <AuthContext.Provider value={{ user, signInWithGoogle }}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

//-------------------------HOOKS------------------------------------------------
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// export function useAuth() {
//     const value = useContext(AuthContext)

//     return value
// }
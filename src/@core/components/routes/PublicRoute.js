// ** React Imports
import { Suspense } from "react"
import { Navigate } from "react-router-dom"

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils"

const PublicRoute = ({ children, route }) => {
  if (route) {
    const user = getUserData()
    // console.log("🚀 ~ PublicRoute ~ role:", user);

    const restrictedRoute = route.meta && route.meta.restricted

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user)} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute

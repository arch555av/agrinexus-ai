import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function RouteLoading() {
  return <div className="dashboard-loading"><div className="loading-orbit" /><p>Opening your field desk…</p></div>
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Suspense>
  )
}

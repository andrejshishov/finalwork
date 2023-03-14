import { Route, Routes } from 'react-router-dom'

import ArticlesList from '../ArticlesList/ArticlesList'
import ArticlePage from '../ArticlePage/ArticlePage'
import NotFoundPage from '../PageError/PageError'
import Layout from '../Layout/Layout'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import Profile from '../Profile/Profile'
import NewArticle from '../NewArticle/NewArticle'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/articles/:slug/edit" element={<NewArticle />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
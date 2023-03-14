import { Link } from 'react-router-dom'

import styles from './PageError.module.scss'

function NotFoundPage() {
  return (
    <div className={styles.main}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  )
}

export default NotFoundPage
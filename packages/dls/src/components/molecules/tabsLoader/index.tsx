import Loader from '@/components/atoms/loader'
import styles from '@/components/atoms/tabs/index.module.css'
import type { ReactNode } from 'react'
import loaderStyles from './index.module.css'

interface TabsLoaderProps {
  children?: ReactNode
  description?: string
  tabsCount?: number
  vertical?: boolean
}

export default function TabsLoader({
  children,
  description,
  tabsCount = 3,
  vertical = false,
}: TabsLoaderProps) {
  return (
    <div className={`${styles.wrapper} ${vertical ? styles.vertical : ''}`}>
      <div className={styles.header}>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.tabList}>
          {[...Array(tabsCount)].map((_, index) => (
            <div
              key={index}
              className={`${loaderStyles.tab} ${vertical ? loaderStyles.vertical : ''}`}
            >
              <Loader
                height={vertical ? 40 : 20}
                variant="secondary"
                width="100%"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

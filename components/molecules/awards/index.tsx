'use client'

import { Awards as AwardsI } from '@/interfaces/player'
import styles from './index.module.css'
import Image from '@/components/atoms/image'
import Tooltip from '@/components/atoms/tooltip'

interface Props {
  awards: AwardsI[]
}
export default function Awards({ awards }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {awards.length > 0 ? (
          awards.map(({ id, awards }) => (
            <div key={id} className={styles.sectionContainer}>
              <h3 className={styles.title}>
                {id}
                <div className={styles.line} />
              </h3>

              <div className={styles.section}>
                {awards.map(
                  ({ id, completed, description, imagePath, title }) => (
                    <Tooltip
                      key={id}
                      ariaLabel="Award details"
                      body={
                        <div className={styles.tooltipContainer}>
                          <h3 className={styles.tooltipTitle}>{title}</h3>
                          <p className={styles.description}>{description}</p>
                        </div>
                      }
                    >
                      <Image
                        circular
                        alt={id}
                        colored={completed}
                        fallbackSrc="/awards/fallback.png"
                        src={imagePath}
                      />
                    </Tooltip>
                  ),
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.errorText}>
            This player doesn&apos;t have any game awards available. <br />
            Please try updating your save file to the Discord server again or
            reach out to the page administrator for assistance.
          </p>
        )}
      </div>
    </div>
  )
}

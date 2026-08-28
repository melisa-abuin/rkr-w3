import styles from './index.module.css'

type RichTextParagraphProps = {
  content: string
}

export default function RichTextParagraph({ content }: RichTextParagraphProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={styles.container}
    />
  )
}

'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import styles from './index.module.css'

type RichTextEditorProps = {
  id: string
  label?: string
  onChange: (html: string) => void
  value: string
}

export default function RichTextEditor({ id, label, onChange, value }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: { id, class: styles.editorContent },
    },
    onUpdate({ editor: e }) {
      onChange(e.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() === value) return
    // treat empty string and Tiptap's empty paragraph as equivalent to avoid spurious resets
    if ((value === '' || value === '<p></p>') && editor.isEmpty) return
    editor.commands.setContent(value)
  }, [editor, value])

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>
        <div aria-label="Text formatting" className={styles.toolbar} role="toolbar">
          <button
            aria-label="Bold"
            aria-pressed={editor?.isActive('bold') ?? false}
            className={`${styles.toolbarButton}${editor?.isActive('bold') ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </button>
          <button
            aria-label="Italic"
            aria-pressed={editor?.isActive('italic') ?? false}
            className={`${styles.toolbarButton}${editor?.isActive('italic') ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </button>
          <button
            aria-label="Strikethrough"
            aria-pressed={editor?.isActive('strike') ?? false}
            className={`${styles.toolbarButton}${editor?.isActive('strike') ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <s>S</s>
          </button>
          <span aria-hidden="true" className={styles.divider} />
          <button
            aria-label="Bullet list"
            aria-pressed={editor?.isActive('bulletList') ?? false}
            className={`${styles.toolbarButton}${editor?.isActive('bulletList') ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            •≡
          </button>
          <button
            aria-label="Ordered list"
            aria-pressed={editor?.isActive('orderedList') ?? false}
            className={`${styles.toolbarButton}${editor?.isActive('orderedList') ? ` ${styles.active}` : ''}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            1.
          </button>
        </div>
        <EditorContent className={styles.editorArea} editor={editor} />
      </div>
    </div>
  )
}

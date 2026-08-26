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

type ToolbarButton = {
  label: string
  mark: string
  children: React.ReactNode
  onClick: () => void
}

type ToolbarItem = ToolbarButton | { type: 'divider' }

export default function RichTextEditor({
  id,
  label,
  onChange,
  value,
}: RichTextEditorProps) {
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

  const toolbarItems: ToolbarItem[] = [
    {
      label: 'Bold',
      mark: 'bold',
      children: <strong>B</strong>,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: 'Italic',
      mark: 'italic',
      children: <em>I</em>,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: 'Strikethrough',
      mark: 'strike',
      children: <s>S</s>,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
    },
    { type: 'divider' },
    {
      label: 'Bullet list',
      mark: 'bulletList',
      children: <>•≡</>,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered list',
      mark: 'orderedList',
      children: <>1.</>,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>
        <div
          aria-label="Text formatting"
          className={styles.toolbar}
          role="toolbar"
        >
          {toolbarItems.map((item, index) =>
            'type' in item ? (
              <span key={index} aria-hidden="true" className={styles.divider} />
            ) : (
              <button
                key={item.label}
                aria-label={item.label}
                aria-pressed={editor?.isActive(item.mark) ?? false}
                className={`${styles.toolbarButton}${editor?.isActive(item.mark) ? ` ${styles.active}` : ''}`}
                type="button"
                onClick={item.onClick}
              >
                {item.children}
              </button>
            ),
          )}
        </div>
        <EditorContent className={styles.editorArea} editor={editor} />
      </div>
    </div>
  )
}

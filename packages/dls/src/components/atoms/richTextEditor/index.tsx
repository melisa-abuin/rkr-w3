'use client'

import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
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

export default function RichTextEditor({
  id,
  label,
  onChange,
  value,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
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

  const activeStates = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e?.isActive('bold') ?? false,
      italic: e?.isActive('italic') ?? false,
      strike: e?.isActive('strike') ?? false,
      bulletList: e?.isActive('bulletList') ?? false,
      orderedList: e?.isActive('orderedList') ?? false,
      primaryColor: e?.isActive('textStyle', { color: '#3182ce' }) ?? false,
      secondaryColor: e?.isActive('textStyle', { color: '#dd6b20' }) ?? false,
    }),
  })

  const toolbarItems: ToolbarButton[] = [
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
    {
      label: 'Primary color',
      mark: 'primaryColor',
      children: (
        <span className={`${styles.colorSwatch} ${styles.primaryColor}`} />
      ),
      onClick: () =>
        editor?.isActive('textStyle', {
          color: 'var(--text-color-brand-primary)',
        })
          ? editor?.chain().focus().unsetColor().run()
          : editor
              ?.chain()
              .focus()
              .setColor('var(--text-color-brand-primary)')
              .run(),
    },
    {
      label: 'Secondary color',
      mark: 'secondaryColor',
      children: (
        <span className={`${styles.colorSwatch} ${styles.secondaryColor}`} />
      ),
      onClick: () =>
        editor?.isActive('textStyle', {
          color: 'var(--text-color-brand-secondary)',
        })
          ? editor?.chain().focus().unsetColor().run()
          : editor
              ?.chain()
              .focus()
              .setColor('var(--text-color-brand-secondary)')
              .run(),
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
          {toolbarItems.map((item) => {
            const active =
              activeStates?.[item.mark as keyof typeof activeStates] ?? false
            return (
              <button
                key={item.label}
                aria-label={item.label}
                aria-pressed={active}
                className={`${styles.toolbarButton}${active ? ` ${styles.active}` : ''}`}
                type="button"
                onClick={item.onClick}
              >
                {item.children}
              </button>
            )
          })}
        </div>
        <EditorContent className={styles.editorArea} editor={editor} />
      </div>
    </div>
  )
}

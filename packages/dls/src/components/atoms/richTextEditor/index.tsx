'use client'

import Color from '@tiptap/extension-color'
import { TableKit } from '@tiptap/extension-table'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import {
  MathDenominator,
  MathFraction,
  MathNumerator,
  MathSqrt,
} from './mathExtensions'

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
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      MathFraction,
      MathNumerator,
      MathDenominator,
      MathSqrt,
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      TableKit.configure({ table: { resizable: false } }),
    ],
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
      alignLeft: e?.isActive({ textAlign: 'left' }) ?? false,
      alignCenter: e?.isActive({ textAlign: 'center' }) ?? false,
      alignRight: e?.isActive({ textAlign: 'right' }) ?? false,
      inTable: e?.isActive('table') ?? false,
    }),
  })

  const [tableDialog, setTableDialog] = useState<{
    rows: number
    cols: number
  } | null>(null)

  function insertTable() {
    if (!tableDialog) return
    editor
      ?.chain()
      .focus()
      .insertTable({
        rows: tableDialog.rows,
        cols: tableDialog.cols,
        withHeaderRow: true,
      })
      .run()
    setTableDialog(null)
  }

  function insertFraction() {
    if (!editor) return
    const { from, to, empty } = editor.state.selection
    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'mathFraction',
          content: [
            { type: 'mathNumerator', content: [{ type: 'text', text: 'a' }] },
            { type: 'mathDenominator', content: [{ type: 'text', text: 'b' }] },
          ],
        })
        .run()
    } else {
      const selected = editor.state.doc.textBetween(from, to)
      const slash = selected.indexOf('/')
      const num =
        (slash >= 0 ? selected.slice(0, slash) : selected).trim() || 'a'
      const den = (slash >= 0 ? selected.slice(slash + 1) : '').trim() || 'b'
      editor
        .chain()
        .focus()
        .command(({ tr, state }) => {
          tr.replaceWith(
            from,
            to,
            state.schema.nodes.mathFraction.create(null, [
              state.schema.nodes.mathNumerator.create(null, [
                state.schema.text(num),
              ]),
              state.schema.nodes.mathDenominator.create(null, [
                state.schema.text(den),
              ]),
            ]),
          )
          return true
        })
        .run()
    }
  }

  function insertSqrt() {
    if (!editor) return
    const { from, to, empty } = editor.state.selection
    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'mathSqrt',
          content: [{ type: 'text', text: 'x' }],
        })
        .run()
    } else {
      const slice = editor.state.doc.slice(from, to)
      editor
        .chain()
        .focus()
        .command(({ tr, state }) => {
          tr.replaceWith(
            from,
            to,
            state.schema.nodes.mathSqrt.create(null, slice.content),
          )
          return true
        })
        .run()
    }
  }

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
          <span aria-hidden="true" className={styles.divider} />
          {(['left', 'center', 'right'] as const).map((align) => {
            const key =
              `align${align.charAt(0).toUpperCase() + align.slice(1)}` as
                'alignLeft' | 'alignCenter' | 'alignRight'
            const active = activeStates?.[key] ?? false
            return (
              <button
                key={align}
                aria-label={`Align ${align}`}
                aria-pressed={active}
                className={`${styles.toolbarButton}${active ? ` ${styles.active}` : ''}`}
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign(align).run()
                }
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="10"
                  viewBox="0 0 12 10"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    stroke="currentColor"
                    strokeWidth="1.5"
                    x1="0"
                    x2="12"
                    y1="1"
                    y2="1"
                  />
                  <line
                    stroke="currentColor"
                    strokeWidth="1.5"
                    x1={align === 'right' ? 4 : 0}
                    x2={align === 'right' ? 12 : align === 'center' ? 10 : 8}
                    y1="5"
                    y2="5"
                  />
                  <line
                    stroke="currentColor"
                    strokeWidth="1.5"
                    x1="0"
                    x2="12"
                    y1="9"
                    y2="9"
                  />
                </svg>
              </button>
            )
          })}
          <span aria-hidden="true" className={styles.divider} />
          <button
            aria-label="Insert fraction"
            className={styles.toolbarButton}
            type="button"
            onClick={insertFraction}
          >
            <span className={styles.fractionPreview}>
              <span>a</span>
              <span>b</span>
            </span>
          </button>
          <button
            aria-label="Insert square root"
            className={styles.toolbarButton}
            type="button"
            onClick={insertSqrt}
          >
            <span className={styles.sqrtPreview}>
              <span>√</span>
              <span>x</span>
            </span>
          </button>
          <span aria-hidden="true" className={styles.divider} />
          {activeStates?.inTable ? (
            <>
              <button
                aria-label="Add row below"
                className={styles.toolbarButton}
                title="Add row"
                type="button"
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                +r
              </button>
              <button
                aria-label="Remove row"
                className={styles.toolbarButton}
                title="Remove row"
                type="button"
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                −r
              </button>
              <button
                aria-label="Add column after"
                className={styles.toolbarButton}
                title="Add column"
                type="button"
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                +c
              </button>
              <button
                aria-label="Remove column"
                className={styles.toolbarButton}
                title="Remove column"
                type="button"
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                −c
              </button>
              <button
                aria-label="Delete table"
                className={`${styles.toolbarButton} ${styles.toolbarButtonDanger}`}
                type="button"
                onClick={() => editor?.chain().focus().deleteTable().run()}
              >
                ×
              </button>
            </>
          ) : (
            <button
              aria-label="Insert table"
              className={styles.toolbarButton}
              type="button"
              onClick={() => setTableDialog({ rows: 3, cols: 3 })}
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="12"
                viewBox="0 0 12 12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  height="11"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  width="11"
                  x="0.5"
                  y="0.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1.2"
                  x1="0.5"
                  x2="11.5"
                  y1="4"
                  y2="4"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1.2"
                  x1="4"
                  x2="4"
                  y1="0.5"
                  y2="11.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1.2"
                  x1="8"
                  x2="8"
                  y1="4"
                  y2="11.5"
                />
              </svg>
            </button>
          )}
        </div>
        {tableDialog && (
          <div className={styles.tableDialog}>
            <label className={styles.tableDialogLabel}>
              Rows
              <input
                autoFocus
                className={styles.tableDialogInput}
                min={1}
                type="number"
                value={tableDialog.rows}
                onChange={(e) =>
                  setTableDialog({
                    ...tableDialog,
                    rows: Math.max(1, Number(e.target.value)),
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && insertTable()}
              />
            </label>
            <label className={styles.tableDialogLabel}>
              Columns
              <input
                className={styles.tableDialogInput}
                min={1}
                type="number"
                value={tableDialog.cols}
                onChange={(e) =>
                  setTableDialog({
                    ...tableDialog,
                    cols: Math.max(1, Number(e.target.value)),
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && insertTable()}
              />
            </label>
            <button
              className={styles.tableDialogConfirm}
              type="button"
              onClick={insertTable}
            >
              Insert
            </button>
            <button
              className={styles.tableDialogCancel}
              type="button"
              onClick={() => setTableDialog(null)}
            >
              Cancel
            </button>
          </div>
        )}
        <EditorContent className={styles.editorArea} editor={editor} />
      </div>
    </div>
  )
}

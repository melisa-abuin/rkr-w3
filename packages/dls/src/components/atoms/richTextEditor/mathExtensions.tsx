import { Node, mergeAttributes } from '@tiptap/core'
import type { NodeViewProps } from '@tiptap/react'
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react'
import styles from './index.module.css'

// ── Fraction numerator (editable inline slot) ──────────────────────────────

function MathNumeratorView() {
  return (
    <NodeViewWrapper className={styles.mathNumerator}>
      <NodeViewContent />
    </NodeViewWrapper>
  )
}

export const MathNumerator = Node.create({
  name: 'mathNumerator',
  inline: true,
  content: 'inline*',
  isolating: true,

  parseHTML() {
    return [{ tag: 'span[data-math="numerator"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-math': 'numerator',
        style:
          'border-bottom:1px solid currentColor;padding:0 3px;text-align:center',
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathNumeratorView)
  },
})

// ── Fraction denominator (editable inline slot) ────────────────────────────

function MathDenominatorView() {
  return (
    <NodeViewWrapper className={styles.mathDenominator}>
      <NodeViewContent />
    </NodeViewWrapper>
  )
}

export const MathDenominator = Node.create({
  name: 'mathDenominator',
  inline: true,
  content: 'inline*',
  isolating: true,

  parseHTML() {
    return [{ tag: 'span[data-math="denominator"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-math': 'denominator',
        style: 'padding:0 3px;text-align:center',
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathDenominatorView)
  },
})

// ── Fraction (container — wraps numerator and denominator slots) ────────────

function MathFractionView({ selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      as="span"
      className={`${styles.mathFraction}${selected ? ` ${styles.mathNodeSelected}` : ''}`}
    >
      <NodeViewContent className={styles.mathFractionContent} />
    </NodeViewWrapper>
  )
}

export const MathFraction = Node.create({
  name: 'mathFraction',
  group: 'inline',
  inline: true,
  content: 'mathNumerator mathDenominator',

  parseHTML() {
    return [{ tag: 'span[data-math="fraction"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-math': 'fraction',
        style:
          'display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:middle;line-height:1.2;margin:0 2px;font-size:0.9em',
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathFractionView)
  },
})

// ── Sqrt (container — wraps whatever is selected) ──────────────────────────

function MathSqrtView({ selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      as="span"
      className={`${styles.mathSqrt}${selected ? ` ${styles.mathNodeSelected}` : ''}`}
    >
      <span className={styles.mathSqrtSymbol}>
        {/* SVG scales to content height; preserveAspectRatio="none" lets it stretch vertically */}
        <svg
          aria-hidden="true"
          className={styles.mathSqrtSvg}
          preserveAspectRatio="none"
          viewBox="0 0 10 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            fill="none"
            points="0,24 2,38 9,2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      <span className={styles.mathSqrtContent}>
        <NodeViewContent />
      </span>
    </NodeViewWrapper>
  )
}

export const MathSqrt = Node.create({
  name: 'mathSqrt',
  group: 'inline',
  inline: true,
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'span[data-math="sqrt"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-math': 'sqrt',
        style:
          'display:inline-flex;align-items:stretch;vertical-align:middle;margin:0 2px;font-size:0.9em',
      }),
      [
        'span',
        { style: 'font-size:1.8em;line-height:1;align-self:flex-end' },
        '√',
      ],
      [
        'span',
        { style: 'border-top:1.5px solid currentColor;padding:0 3px' },
        0,
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathSqrtView)
  },
})

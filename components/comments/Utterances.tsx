'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

const Utterances = (): React.ReactElement => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', siteMetadata.comment.utterancesConfig.issueTerm)
    script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
    script.setAttribute('theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.utterances-frame')
    if (!iframe) return
    LoadComments()
  }, [LoadComments])

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return (
    <div className="pb-6 pt-6 text-center text-gray-700">
      {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className="utterances-frame relative" id={COMMENTS_ID} />
    </div>
  )
}

export default Utterances

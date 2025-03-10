import Script from 'next/script'
import React from 'react'
import HelloPage from './page'

type Props = {}

const layout = (props: Props) => {
  return (
    <>
    <Script
        src="http://localhost:4000/script.js" 
        data-website-id="358005b5-1955-4243-b3ef-900dbce89999"
        strategy="afterInteractive"
      />
      <body>

      <HelloPage/>
      </body>
    </>
  )
}

export default layout
// app/layout.js
'use client'
import '/style.css';
import '/tailwind.css';
import { NextUIProvider } from "@nextui-org/react";
import PropTypes from 'prop-types'

function ClientComponent({ children }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default function RootLayout({ children }) {
  return (
    <ClientComponent>
      {children}
    </ClientComponent>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
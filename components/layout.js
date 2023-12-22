// layout.js
import PropTypes from 'prop-types'

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

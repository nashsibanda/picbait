import React from 'react'

type LoadingSpinnerProps = {
  className?: string
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
  <div className={`loading-spinner-container ${className}`}>
    <i className='fas fa-spinner fa-spin' />
  </div>
)

LoadingSpinner.defaultProps = {
  className: '',
}

export default LoadingSpinner

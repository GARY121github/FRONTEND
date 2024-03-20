import React from 'react'

interface authPage {
    children: React.ReactNode,
    className ?: string
}

const AuthPageLayout: React.FC<authPage> = ({ children , className}) => {
    return (
        <div className={`flex flex-col gap-6 items-center justify-center ${className}`}>
            {children}
        </div>
    )
}

export default AuthPageLayout

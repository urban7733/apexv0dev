"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
  deleteAccount: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("apex-verify-ai-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("apex-verify-ai-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("apex-verify-ai-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("apex-verify-ai-user")
  }

  const deleteAccount = async () => {
    try {
      // Simulate API call to delete account
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear user data
      setUser(null)
      localStorage.removeItem("apex-verify-ai-user")

      // Could redirect to home page or show confirmation
      window.location.href = "/"
    } catch (error) {
      console.error("Error deleting account:", error)
      throw error
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    deleteAccount,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

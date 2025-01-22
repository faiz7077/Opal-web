'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check, X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface EditableFieldProps {
  initialValue: string
  onSave: (value: string) => Promise<void>
  inputClassName?: string
  disabled?: boolean
}

export default function EditableField({ initialValue, onSave, inputClassName, disabled = false }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  const handleEditStart = () => {
    if (!disabled) {
      setIsEditing(true)
    }
  }

  const handleEditEnd = async () => {
    if (value !== initialValue) {
      try {
        await onSave(value)
        setIsEditing(false)
      } catch (error) {
        console.error("Failed to save:", error)
        setValue(initialValue)
      }
    } else {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setValue(initialValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleEditEnd}
            onKeyDown={handleKeyDown}
            className={cn("flex-grow", inputClassName)}
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleEditEnd}>
            <Check className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        </>
      ) : (
        <>
          <span className={cn("flex-grow", inputClassName)}>{value}</span>
          {!disabled && (
            <Button size="icon" variant="ghost" onClick={handleEditStart}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}
        </>
      )}
    </div>
  )
}
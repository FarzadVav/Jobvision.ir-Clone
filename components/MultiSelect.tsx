"use client"

import { forwardRef, useState } from "react"

import { cn } from "../lib/utils"
import { IconChevronDown } from "@tabler/icons-react"
import { v4 as uuid } from "uuid"

interface MultiSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperclassName?: string
  error?: boolean
  data: string[]
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ wrapperclassName, error, className, data, ...props }, ref) => {
    const [value, setValue] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    return (
      <div className={cn("w-full relative", wrapperclassName)} ref={ref}>
        <div className="flex items-center relative">
          <input
            className={cn(
              `ring-1 h-11 w-full px-5 rounded-md transition-shadow focus:ring-2 focus:rounded-b-none file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
                error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
              }`,
              className
            )}
            ref={ref}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            {...props}
          />
          <IconChevronDown
            className={`icon absolute left-3 transition-transform ${isFocus ? "-scale-y-100" : ""}`}
          />
        </div>
        <ul
          className={`bg-white border border-solid border-light w-full px-1.5 py-1.5 rounded-b-md absolute left-0 top-full transition-all ${
            isFocus ? "" : "opacity-0 invisible -translate-y-3"
          } z-50`}
        >
          {data.length ? (
            data.find((item) => item.includes(value)) ? (
              data.map((item) => {
                if (item.includes(value))
                  return (
                    <li
                      key={uuid()}
                      className="w-full py-1.5 px-3 rounded cursor-pointer transition-colors hover:bg-light/50"
                      onMouseDown={() => setValue(item)}
                    >
                      {item}
                    </li>
                  )
              })
            ) : (
              <li className="py-1.5">موردی پیدا نشد</li>
            )
          ) : (
            <li className="py-1.5">لیستی برای انتخاب وجود ندارد</li>
          )}
        </ul>
      </div>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect

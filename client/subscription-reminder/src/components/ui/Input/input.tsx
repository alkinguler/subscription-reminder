import * as React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Button from "../Button/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { passwordInputStyle } from "./constants/input-style-constants";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={passwordInputStyle}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4 focus:ring-offset-0" />
          ) : (
            <EyeOffIcon className="h-4 w-4 focus:ring-offset-0" />
          )}
        </Button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };

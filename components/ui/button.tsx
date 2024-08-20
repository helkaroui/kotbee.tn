import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        // Tutorial
        default:
          'bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500',
        
        primary:
          'bg-[#74c0fc] text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0',
          
        primaryOutline:
          'bg-white text-sky-500 hover:bg-slate-100',

        secondary:
          'bg-appprimary text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0',
        
        secondaryOutline:
          'bg-white text-green-500 hover:bg-slate-100',

        danger:
          'bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0',
        
        dangerOutline:
          'bg-white text-rose-500 hover:bg-slate-100',

        gold:
          'bg-amber-300 text-amber-700 hover:bg-amber-300/90 border-amber-500 border-b-4 active:border-b-0',

        super:
          'bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0',
        
        superOutline:
          'bg-white text-indigo-500 hover:bg-slate-100',

        ghost:
          'bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100',

        sidebar:
         'bg-transparent text-slate-500 border-transparent border-2 hover:bg-slate-100 transition-none',

        sidebarOutline:
         'bg-[#74c0fc] text-white rounded-lg border-[#15619e] border hover:bg-[#51a8ed] transition-none',

         locked:
         'bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0',
        
        // Copy paste from github
        default2:
          'bg-card text-card-foreground border-2 border-b-4 hover:bg-border/50 active:border-b-2 dark:hover:bg-border/70',
        primary2:
          'bg-primary text-primary-foreground border-b-4 border-primary-depth hover:bg-primary/90 active:border-b-0',
        secondary2:
          'bg-secondary text-secondary-foreground border-b-4 border-secondary-depth hover:bg-secondary/90 active:border-b-0',
        danger2:
          'bg-destructive text-destructive-foreground border-b-4 border-destructive-depth hover:bg-destructive/90 active:border-b-0',
        super2:
          'bg-super text-super-foreground border-b-4 border-super-depth hover:bg-super/90 active:border-b-0',
        highlight:
          'bg-highlight-depth/75 text-super-foreground border-b-4 border-highlight-depth hover:bg-highlight-depth/65 active:border-b-0',
        golden:
          'bg-amber-300 text-amber-700 border-b-4 border-amber-400 hover:bg-amber-300/90 active:border-b-0',
        locked2:
          'bg-neutral-200 text-neutral-400 border-b-4 border-current hover:bg-neutral-200/90 active:border-b-0 dark:bg-disabled dark:text-disabled-foreground dark:hover:bg-disabled/90',
        ghost2:
          'bg-transparent border-2 border-transparent hover:bg-black/5 dark:bg-white/[0.015] dark:hover:bg-white/5',
        immersive:
          'bg-transparent text-current border-2 border-b-4 border-black/20 hover:opacity-85 active:border-b-0',
        active:
          'bg-secondary/15 text-secondary border-2 border-b-4 border-secondary/80 hover:bg-secondary/20',
        correct:
          'bg-green-500/15 text-green-500 border-2 border-b-4 border-green-500/80 hover:bg-green-500/20',
        incorrect:
          'bg-destructive/15 text-destructive border-2 border-b-4 border-destructive/80 hover:bg-destructive/20',

        whiteComic:
          'bg-white text-black hover:bg-gray-200/90 border-gray-800 border-2 border-b-4 active:border-b-2 rounded-md',

        orangeComic:
          'bg-white text-orange-500 hover:bg-gray-200/90 border-orange-500 border-2 border-b-4 active:border-b-2 rounded-md',

        filledYellowComic:
          'bg-[#ffd43b] text-black hover:bg-gray-200/90 border-gray-800 border-2 border-b-4 active:border-b-2 rounded-md',

        comicLightWhite:
          'bg-slate-100 text-gray-600 hover:bg-gray-200/90 border-gray-400 border border-b-4 active:border-b-2 rounded-lg',  
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

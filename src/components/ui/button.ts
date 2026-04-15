import { defineComponent, h } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export const Button = defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String as () => ButtonVariants['variant'],
      default: 'default',
    },
    size: {
      type: String as () => ButtonVariants['size'],
      default: 'default',
    },
    asChild: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const classes = cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
      if (props.asChild && slots.default) {
        const children = slots.default()
        if (children.length > 0) {
          const child = children[0]
          return h(child, { ...attrs, class: classes }, child.children ?? undefined)
        }
      }
      return h('button', { ...attrs, class: classes }, slots.default?.())
    }
  },
})

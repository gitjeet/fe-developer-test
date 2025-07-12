import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "w-fit text-white body-3 transition-all ease-in-out duration-200 flex items-center justify-center gap-2",
  variants: {
    variant: {
      default:
        "bg-primary-400 hover:bg-primary-600 disabled:bg-primary-400 disabled:cursor-not-allowed",
      secondary:
        "bg-neutral-500 hover:bg-neutral-600 disabled:bg-neutral-400 disabled:cursor-not-allowed",
      destructive:
        "bg-error-600 hover:bg-error-900 disabled:bg-error-400 disabled:cursor-not-allowed",
      success:
        "bg-success-600 hover:bg-success-900 disabled:bg-success-400 disabled:cursor-not-allowed",
      outline:
        "bg-transparent border border-primary-400 hover:bg-primary-600 disabled:border-primary-300 disabled:text-primary-300 disabled:cursor-not-allowed",
    },
    size: {
      default: "py-3 px-6 rounded-lg",
      small: "px-2 py-1 rounded",
    },
  },
});

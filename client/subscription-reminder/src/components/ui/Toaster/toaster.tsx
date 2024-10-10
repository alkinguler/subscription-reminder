import { useToast } from "@/components/ui/Toaster/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { CircleX, CircleCheck } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();
  const iconVariantMapper: { [key: string]: JSX.Element } = {
    destructive: <CircleX className="min-w-fit" />,
    successful: <CircleCheck className="min-w-fit" />,
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        icon,
        id,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            {icon && props.variant && iconVariantMapper[props.variant]}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

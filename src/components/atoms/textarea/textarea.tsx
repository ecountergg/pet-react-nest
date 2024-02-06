import * as React from "react";

import { cn } from "@/lib/cva.lib";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  defaultValue,
  ...props
}: UseControllerProps<TFieldValues, TName> & ITextareaProps) => {
  const {
    field: { value, onChange: onChange },
    fieldState,
  } = useController({
    name,
    control,
    // @ts-expect-error
    defaultValue: defaultValue ?? "",
  });
  return (
    <>
      <textarea
        {...props}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {fieldState.error && (
        <small className="text-red-700">{fieldState.error?.message}</small>
      )}
    </>
  );
};

export { Textarea, FormTextarea };

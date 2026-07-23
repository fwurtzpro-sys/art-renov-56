import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type SelectProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    children: React.ReactNode;
  };

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const fieldClasses =
  "w-full rounded-sm border bg-white px-4 py-3 text-sm text-anthracite placeholder:text-ardoise-400 transition-colors duration-200 focus-visible:border-ardoise-700";

export function FormField(props: FormFieldProps) {
  const { label, name, error, required, as = "input", className, ...rest } = props;
  const errorId = `${name}-error`;

  const sharedProps = {
    id: name,
    name,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      fieldClasses,
      error ? "border-red-400" : "border-ardoise-200",
      className
    ),
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-anthracite"
      >
        {label}
        {required && <span className="text-breton-600"> *</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          rows={5}
          {...sharedProps}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select {...sharedProps} {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          {(props as SelectProps).children}
        </select>
      ) : (
        <input
          {...sharedProps}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}





import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";
import { DefaultValues } from "react-hook-form";


type FormWrapperProps<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSubmit?: (data: T) => void;
  children: (methods: UseFormReturn<T>) => ReactNode;
  className?: string;
};

export function FormWrapper<T extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
  className = ''
}: FormWrapperProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => { }))} className={className}>
        {children(methods)}
      </form>
    </FormProvider>
  );
}


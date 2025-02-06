import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface Props {
  control: any
  type?: string
  name: string
  placeholder?: string
  label?: string
  description?: string
  inputClass?: string
  inputFocus?: boolean
}
export default function CustomFormField({
  control,
  type = 'text',
  name,
  label,
  placeholder = '',
  description,
  inputClass = '',
  inputFocus = false,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              {...field}
              type={type}
              className={`${inputClass}`}
              autoFocus={true}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

import clsx from "clsx";
import { ChangeEvent } from "react";
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Variant = "solid" | "outline";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ColorSchema = "blue" | "red" | "green";
 
interface SelectProps {
  options: { value: string | number; label: string }[];
  name: string;
  isError?: boolean;
  messageError?: string;
  id: string;
  value: string | number | null | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
 
const Select: React.FC<
  SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  options,
  value,
  name,
  id,
  messageError = "wajib di isi",
  isError = false,
  ...props
}) => {
  return (
    <section>
      <select
        value={value}
        name={name}
        id={id}
        className={clsx(`w-full h-8 border rounded px-2`, {
          "border-red-500 border-2": isError,
          "border-gray-700 text-black": !isError,
        })}
        {...props}
      >
        {!!value === false && <option>Pilih</option>}
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};
 
 
export default Select;
import React from "react";
import clsx from "clsx";

type Variant = 'solid' | 'outline';
type ColorSchema = 'blue' | 'green' | 'red' | 'gray';

// Props untuk Komponen Button
interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  variant?: Variant;
  colorSchema: ColorSchema;
}

function Button({
    title,
    isDisabled = false,
    variant = 'solid',
    colorSchema = 'blue',
    ...props
  }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        {...props}
        disabled={isDisabled}
        className={clsx(
          "px-6 py-3 rounded text-center font-medium", // ukuran dasar button
          {
            // button solid
            "bg-blue-500 text-white border-transparent": variant === 'solid' && colorSchema === 'blue',
            "bg-green-500 text-white border-transparent": variant === 'solid' && colorSchema === 'green',
            "bg-red-500 text-white border-transparent": variant === 'solid' && colorSchema === 'red',
            "bg-gray-500 text-white border-transparent": variant === 'solid' && colorSchema === 'gray',
  
            // button outline
            "border-blue-500 border-2 text-blue-500 bg-white": variant === 'outline' && colorSchema === 'blue',
            "border-green-500 border-2 text-green-500 bg-white": variant === 'outline' && colorSchema === 'green',
            "border-red-500 border-2 text-red-500 bg-white": variant === 'outline' && colorSchema === 'red',
            "border-gray-500 border-2 text-gray-500 bg-white": variant === 'outline' && colorSchema === 'gray',
  
            // disable
            "opacity-50 cursor-not-allowed": isDisabled,
          }
        )}
      >
        {title}
      </button>
    );
  }
  
  export default Button;
"use client";
import { ReactNode } from "react";
 
 
interface TableProps {
  children: ReactNode;
  isFetching?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
}
 
export const Table: React.FC<TableProps> = ({
  isFetching = false,
  isEmpty = false,
  isError = false,
  children,
}) => {
 
 
  return (
    <>
      {" "}
      <table className="w-full  divide-y divide-gray-200 ">{children}</table>
 
      {isError && (
        <div className='flex items-center justify-center w-full h-32'>
          <div className='text-lg text-gray-500'>Ada kesalahan</div>
        </div>
      )}
      {isEmpty &&  !isFetching && !isError ? (
        <div className='flex items-center justify-center w-full h-32'>
          <div className='text-lg text-gray-500'>Data tidak ditemukan</div>
        </div>
      ) : null}
 
 
    </>
  );
};
 
interface TheadProps {
  children: ReactNode;
}
 
export const Thead: React.FC<TheadProps> = ({ children }) => {
  return <thead className="bg-gray-50 ">{children}</thead>;
};
 
interface TbodyProps {
  children: ReactNode;
}
 
export const Tbody: React.FC<TbodyProps> = ({ children }) => {
  return <tbody className="bg-white ">{children}</tbody>;
};
 
interface TrProps {
  children: ReactNode;
}
 
export const Tr: React.FC<TrProps> = ({ children }) => {
  return <tr>{children}</tr>;
};
 
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}
 
export const Th: React.FC<ThProps> = ({ children, ...props }) => {
  return (
    <th
      className="px-4 py-2 text-lg text-left bg-gray-100   font-medium text-gray-700 "
      {...props}
    >
      {children}
    </th>
  );
};
 
interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}
 
export const Td: React.FC<TdProps> = ({ children, ...props }) => {
  return (
    <td
      className="px-4  border-b-2 py-2 text-sm font-medium text-gray-700 "
      {...props}
    >
      {children}
    </td>
  );
};
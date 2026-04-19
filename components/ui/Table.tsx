import { cn } from '@/lib/utils';
import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, forwardRef } from 'react';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table ref={ref} className={cn('min-w-full divide-y divide-gray-200', className)} {...props}>
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-gray-200 bg-white', className)} {...props}>
      {children}
    </tbody>
  )
);
TableBody.displayName = 'TableBody';

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('hover:bg-gray-50 transition-colors', className)}
      {...props}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
);
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 text-sm text-gray-900', className)} {...props}>
      {children}
    </td>
  )
);
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };

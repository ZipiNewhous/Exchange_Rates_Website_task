import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


const TanstackExchangeRateTable = ({ baseCurrency, exchangeRates }) => {

  if (!exchangeRates) {
    return <div>Loading exchange rates...</div>;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fixData()
  }, [baseCurrency]);

  const fixData = () => {
    const dataArray = [];
    for (const item in exchangeRates) {
      dataArray.push({
        baseCurrency: baseCurrency,
        targetCurrency: item,
        conversionRate: exchangeRates[item]
      })
    }
    setData(dataArray);
  }

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('baseCurrency', {
      header: () => 'Base',
      cell: info => info.renderValue(),
      
    }),
    columnHelper.accessor('targetCurrency', {
      header: () => 'Target',
      cell: info => info.renderValue(),
      
    }),
    columnHelper.accessor('conversionRate', {
      header: () => 'Exchange Rates',
      cell: info => info.renderValue(),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default TanstackExchangeRateTable;
"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const ranges = [
  {label: 'Hoje', value: '1'},
  {label: 'Semana', value: '7'},
  {label: '15 dias', value: '15'},
  {label: 'Mês', value: '30'},
];

export function DateRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (rangeValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('range', rangeValue);
    router.replace(`${pathname}?${params.toString()}`);
  }
  const currentRange = searchParams.get('range') || '7'; // Default to 7 days if no range is set

  return (
    <div className="flex items-center gap-1 justify-center">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleFilterChange(range.value)}
         className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            currentRange === range.value
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  )

}
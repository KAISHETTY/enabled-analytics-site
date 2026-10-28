"use client"

import * as React from "react"
import { FilterBar, Pagination } from "@/components/ea/filterable-grid"

export function FilterBarDemo() {
  const [value, setValue] = React.useState("All")
  const [page, setPage] = React.useState(1)
  return (
    <div className="space-y-6">
      <FilterBar options={["Communications", "Manufacturing", "Professional Services"]} value={value} onChange={setValue} label="Demo filter" />
      <Pagination page={page} pages={4} onChange={setPage} />
    </div>
  )
}

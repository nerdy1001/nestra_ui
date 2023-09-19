"use client"

import { Property, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contact = {
  id: string
  text: string
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Potential Tenant",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "property",
    header: "Property",
  },
]

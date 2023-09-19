"use client"

import { PropertyContactType } from "@/app/types"
import { formatTimeToNow } from '../../libs/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC } from "react"
import EmptyState from "@/app/components/EmptyState"

interface ContactTableProps {
  data?: PropertyContactType
}

const ContactTable: FC<ContactTableProps> = ({ data }) => {
  return (
    <>
    {data?.length ? (
      <div className="rounded-md border">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Potential Client</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Time Contacted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((contact) => (
        <TableRow key={contact.id}>
          <TableCell className="font-medium">
            {contact.contact.firstName} {contact.contact.lastName}
          </TableCell>
          <TableCell>{contact.contact.phoneNumber}</TableCell>
          <TableCell>{contact.property.title}</TableCell>
          <TableCell className="text-right">{formatTimeToNow(contact.contactedAt)}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </div>
    ): (
      <div>
        <p className="text-[#747171] text-[15px] tracking-wider">
          No one.
        </p>
      </div>
    )}
    </>
  )
}

export default ContactTable

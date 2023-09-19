"use client"

import { PropertyCommentType, PropertyContactType } from "@/app/types"
import { formatTimeToNow } from '../../libs/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC } from "react"

interface CommentTableProps {
  data?: PropertyCommentType
}

const CommentTable: FC<CommentTableProps> = ({ data }) => {
  return (
    <>
      {data?.length ? (
          <div className="overflow-y-auto max-h-[350px] rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 h-0">
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="truncate">Date Commented</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="tracking-wider">{comment.text}</TableCell>
                  <TableCell className="tracking-wider truncate">{comment.property.title}</TableCell>
                  <TableCell className="tracking-wider">{formatTimeToNow(comment.createdAt)}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
      ) : (
        <div>
          <p className="text-[#747171] text-[15px] tracking-wider">
            None.
          </p>
        </div>
      )}
    </>
  )
}

export default CommentTable
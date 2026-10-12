import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "../pagination";
import { DeleteDialog } from "../deleteDialog";
import { deleteUser } from "@/lib/actions/user.actions";
import { formatId } from "@/lib/utils";
import { User } from "@/types";

type Props = {
  users: User[];
  totalPages: number;
  page: number;
};

export const UsersTable = ({ users, totalPages, page }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">ID</TableHead>
            <TableHead className="text-gray-500">NAME</TableHead>
            <TableHead className="text-gray-500">EMAIL</TableHead>
            <TableHead className="text-gray-500">ROLE</TableHead>
            <TableHead className="text-gray-500">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{formatId(user.id)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === "user" ? (
                  <Badge variant="secondary">User</Badge>
                ) : (
                  <Badge variant="default">Admin</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button variant="outline" size="sm">
                  <Link href={`/admin/users/${user.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={user.id} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={totalPages} />
      )}
    </div>
  );
};

// src/pages/Students.tsx
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// --- Mock data (replace with API later) ---
const studentsData = [
  {
    id: "STU001",
    name: "Akash Gupta",
    email: "akash.gupta@email.com",
    phone: "74874839201",
    course: "Computer Science",
    year: "3rd Year",
    gpa: 3.85,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  },
  {
    id: "STU002",
    name: "Mohan Kumar",
    email: "mohan.kumar@email.com",
    phone: "7894561230",
    course: "Mathematics",
    year: "2nd Year",
    gpa: 3.92,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "STU003",
    name: "Samiksha Patel",
    email: "samiksha.patel@email.com",
    phone: "89684739201",
    course: "Physics",
    year: "4th Year",
    gpa: 3.78,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    id: "STU004",
    name: "Kunal Singh",
    email: "kunal.singh@email.com",
    phone: "89684739201",
    course: "Engineering",
    year: "1st Year",
    gpa: 3.65,
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    id: "STU005",
    name: "Tanya Sharma",
    email: "tanya.sharma@email.com",
    phone: "89068567890",
    course: "Biology",
    year: "3rd Year",
    gpa: 3.91,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150"
  }
];

export function StudentTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // --- Filtering & Searching ---
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.id.toLowerCase().includes(search.toLowerCase()) ||
        student.course.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 border-gray-300">Inactive</Badge>
    );
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.8) return "text-green-600";
    if (gpa >= 3.5) return "text-yellow-600";
    return "text-gray-500";
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <Input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead>Student</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Course & Year</TableHead>
            <TableHead>GPA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStudents.map((student, index) => (
            <motion.tr
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-muted/50 border-border group"
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{student.course}</p>
                  <p className="text-sm text-muted-foreground">{student.year}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className={`font-semibold ${getGPAColor(student.gpa)}`}>
                  {student.gpa.toFixed(2)}
                </span>
              </TableCell>
              <TableCell>{getStatusBadge(student.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Student
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

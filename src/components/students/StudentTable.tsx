import { motion } from "framer-motion";
import { useState } from "react";
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

const studentsData = [
  {
    id: "STU001",
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    phone: "+1 (555) 123-4567",
    course: "Computer Science",
    year: "3rd Year",
    gpa: 3.85,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  },
  {
    id: "STU002", 
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    course: "Mathematics",
    year: "2nd Year",
    gpa: 3.92,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "STU003",
    name: "Sarah Williams",
    email: "sarah.williams@email.com", 
    phone: "+1 (555) 345-6789",
    course: "Physics",
    year: "4th Year",
    gpa: 3.78,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    id: "STU004",
    name: "David Rodriguez",
    email: "david.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    course: "Engineering",
    year: "1st Year",
    gpa: 3.65,
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    id: "STU005",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901",
    course: "Biology",
    year: "3rd Year", 
    gpa: 3.91,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150"
  }
];

export function StudentTable() {
  const [students] = useState(studentsData);

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.8) return "text-success";
    if (gpa >= 3.5) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Contact</TableHead>
            <TableHead className="font-semibold">Course & Year</TableHead>
            <TableHead className="font-semibold">GPA</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
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
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-sm">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{student.course}</p>
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
    </div>
  );
}
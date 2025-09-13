import { motion } from "framer-motion";
import { Mail, Phone, BookOpen, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const facultyData = [
  {
    id: "FAC001",
    name: "Dr. Robert Anderson",
    email: "r.anderson@university.edu",
    phone: "+1 (555) 111-2222",
    department: "Computer Science",
    position: "Professor",
    specialization: "Machine Learning",
    courses: 3,
    office: "Room 304A",
    experience: "15 years",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
  },
  {
    id: "FAC002",
    name: "Dr. Maria Garcia",
    email: "m.garcia@university.edu", 
    phone: "+1 (555) 222-3333",
    department: "Mathematics",
    position: "Associate Professor",
    specialization: "Applied Mathematics",
    courses: 4,
    office: "Room 201B",
    experience: "12 years",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0c8f2c12f47?w=150"
  },
  {
    id: "FAC003",
    name: "Dr. James Wilson",
    email: "j.wilson@university.edu",
    phone: "+1 (555) 333-4444", 
    department: "Physics",
    position: "Professor",
    specialization: "Quantum Physics",
    courses: 2,
    office: "Lab 105",
    experience: "20 years",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150"
  },
  {
    id: "FAC004",
    name: "Dr. Emily Davis",
    email: "e.davis@university.edu",
    phone: "+1 (555) 444-5555",
    department: "Chemistry", 
    position: "Assistant Professor",
    specialization: "Organic Chemistry",
    courses: 3,
    office: "Lab 203",
    experience: "8 years",
    avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150"
  },
  {
    id: "FAC005",
    name: "Dr. Michael Brown",
    email: "m.brown@university.edu",
    phone: "+1 (555) 555-6666",
    department: "Engineering",
    position: "Professor",
    specialization: "Mechanical Engineering", 
    courses: 5,
    office: "Workshop 401",
    experience: "18 years",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150"
  },
  {
    id: "FAC006",
    name: "Dr. Sarah Miller",
    email: "s.miller@university.edu",
    phone: "+1 (555) 666-7777",
    department: "Biology",
    position: "Associate Professor", 
    specialization: "Molecular Biology",
    courses: 3,
    office: "Lab 301",
    experience: "14 years",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
  }
];

export function FacultyGrid() {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "Professor":
        return "bg-primary/10 text-primary border-primary/20";
      case "Associate Professor":
        return "bg-success/10 text-success border-success/20";
      case "Assistant Professor":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {facultyData.map((faculty, index) => (
        <motion.div
          key={faculty.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card className="card-soft card-hover h-full">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar and Basic Info */}
                <div className="space-y-3">
                  <Avatar className="h-20 w-20 border-4 border-primary/10">
                    <AvatarImage src={faculty.avatar} alt={faculty.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{faculty.name}</h3>
                    <p className="text-sm text-muted-foreground">{faculty.id}</p>
                  </div>
                </div>

                {/* Position and Department */}
                <div className="space-y-2 w-full">
                  <Badge className={getPositionColor(faculty.position)}>
                    {faculty.position}
                  </Badge>
                  <p className="text-sm font-medium text-foreground">{faculty.department}</p>
                  <p className="text-xs text-muted-foreground">{faculty.specialization}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <BookOpen className="w-3 h-3 text-primary" />
                      <span className="text-sm font-semibold text-primary">{faculty.courses}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Courses</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <Award className="w-3 h-3 text-success" />
                      <span className="text-sm font-semibold text-success">{faculty.experience}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{faculty.office}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{faculty.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{faculty.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
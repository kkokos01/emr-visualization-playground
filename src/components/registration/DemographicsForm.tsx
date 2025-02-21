
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DemographicsForm = () => {
  const [dob, setDob] = useState<Date>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="font-medium flex items-center gap-1">
            First Name
            <span className="text-primary">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder="Enter first name" 
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="font-medium flex items-center gap-1">
            Last Name
            <span className="text-primary">*</span>
          </Label>
          <Input 
            id="lastName" 
            placeholder="Enter last name" 
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob" className="font-medium flex items-center gap-1">
            Date of Birth
            <span className="text-primary">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="font-medium flex items-center gap-1">
            Gender
            <span className="text-primary">*</span>
          </Label>
          <Select>
            <SelectTrigger className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium flex items-center gap-1">
            Email
            <span className="text-primary">*</span>
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter email address"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="font-medium flex items-center gap-1">
            Phone Number
            <span className="text-primary">*</span>
          </Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="Enter phone number"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssn" className="font-medium flex items-center gap-1">
            SSN (Last 4 digits)
            <span className="text-primary">*</span>
          </Label>
          <Input 
            id="ssn" 
            maxLength={4} 
            placeholder="xxxx"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus" className="font-medium">
            Marital Status
            <span className="text-sm text-muted-foreground ml-2">(Optional)</span>
          </Label>
          <Select>
            <SelectTrigger className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="font-medium flex items-center gap-1">
          Address
          <span className="text-primary">*</span>
        </Label>
        <Input 
          id="address" 
          placeholder="Street address"
          className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Input 
            placeholder="City"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
          <Input 
            placeholder="State"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
          <Input 
            placeholder="ZIP Code"
            className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};


import { Card } from "@/components/ui/card";

interface SOAPSectionProps {
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
}

export const SOAPSection = ({ title, value, onChange, placeholder }: SOAPSectionProps) => {
  return (
    <Card className="p-4 bg-white shadow-md border-2 border-primary/20">
      <h3 className="font-semibold mb-2 text-foreground">{title}</h3>
      <textarea
        className="w-full h-32 p-2 text-sm rounded-md border-2 border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 text-foreground"
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </Card>
  );
};

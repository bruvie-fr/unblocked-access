import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="
      group p-6 rounded-2xl
      glass
      transition-all duration-300
      hover:bg-secondary/50
    ">
      <div className="
        w-12 h-12 rounded-xl
        bg-primary/10 
        flex items-center justify-center
        mb-4
        group-hover:bg-primary/20
        transition-colors duration-300
      ">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

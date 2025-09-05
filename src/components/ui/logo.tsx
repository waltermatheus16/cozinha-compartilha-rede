import logoImage from "@/assets/logo-comsea.JPG";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20", 
    lg: "w-24 h-24"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} transition-transform duration-300 hover:scale-110 cursor-pointer`}>
      <img 
        src={logoImage} 
        alt="COMSEA Logo" 
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};

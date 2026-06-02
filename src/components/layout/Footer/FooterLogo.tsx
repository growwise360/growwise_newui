import { FooterData } from './types';

interface FooterLogoProps {
  logo: FooterData['logo'];
  description: string;
}

export default function FooterLogo({ logo, description }: FooterLogoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <div 
          className="bg-center bg-contain bg-no-repeat" 
          style={{ 
            backgroundImage: `url('${logo.src}')`,
            width: `${logo.width}px`,
            height: `${logo.height}px`
          }}
          role="img"
          aria-label={logo.alt}
        />
      </div>
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
    </div>
  );
}

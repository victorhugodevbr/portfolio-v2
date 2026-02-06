import { memo, useMemo } from 'react';

interface ProjectCardProps {
  backgroundColor: string;
  logo: string;
  logoOpacity?: number;
  logoPosition?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  logoSize?: {
    width: string;
    height: string;
  };
  logoRotation?: number;
  title: string | { 
    line1: { text: string; color: string; size?: string; style?: React.CSSProperties };
    line2?: { text: string; color: string; size?: string; style?: React.CSSProperties };
  };
  titleFont?: string;
  titleWeight?: number;
  description: string;
  phoneImage: string;
  buttonColor: string;
  buttonTextColor: string;
  onClick?: () => void;
}

const ProjectCard = memo(function ProjectCard({
  backgroundColor,
  logo,
  logoOpacity = 0.2,
  logoPosition = { top: '-2.5rem', left: '-5rem' },
  logoSize = { width: '45rem', height: '45rem' },
  logoRotation = 19,
  title,
  titleFont,
  titleWeight,
  description,
  phoneImage,
  buttonColor,
  buttonTextColor,
  onClick,
}: ProjectCardProps) {
  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return (
        <h2
          className="leading-[0.9]"
          style={{
            color: 'white',
            fontFamily: titleFont,
            fontWeight: titleWeight,
            fontSize: 'clamp(64px,8vw,128px)',
          }}
        >
          {title}
        </h2>
      );
    }

    return (
      <div>
        <h2
          className="leading-[0.9]"
          style={{
            color: title.line1.color,
            fontFamily: titleFont,
            fontWeight: titleWeight,
            fontSize: title.line1.size || 'clamp(64px,8vw,128px)',
            ...title.line1.style,
          }}
        >
          {title.line1.text}
        </h2>
        {title.line2 && (
          <h2
            className="leading-[0.9]"
            style={{
              color: title.line2.color,
              fontFamily: titleFont,
              fontWeight: titleWeight,
              fontSize: title.line2.size || 'clamp(64px,8vw,128px)',
              ...title.line2.style,
            }}
          >
            {title.line2.text}
          </h2>
        )}
      </div>
    );
  }, [title, titleFont, titleWeight]);

  return (
    <div
      className={`relative flex flex-row gap-2 p-6 md:p-8 lg:p-20 w-full rounded-3xl overflow-hidden transition-transform duration-300 ease-out ${onClick ? 'hover:scale-105 cursor-pointer' : ''} group`}
      style={{ backgroundColor, willChange: 'transform' }}
      onClick={onClick}
    >
      <div
        className="absolute"
        style={{
          ...logoPosition,
          width: logoSize.width,
          height: logoSize.height,
        }}
      >
        <img
          src={logo}
          alt="Project Logo"
          className="w-full h-full object-contain"
          loading="lazy"
          style={{
            opacity: logoOpacity,
            transform: `rotate(${logoRotation}deg)`,
          }}
        />
      </div>
      <div className="relative flex flex-col justify-center gap-8">
        {renderTitle}
        <p className="relative text-[clamp(14px,1.25vw,24px)] leading-[1.2] font-bold text-white">
          {description}
        </p>
        {onClick && (
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-8 py-3 font-bold rounded-lg hover:bg-gray-100 w-fit"
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor,
            }}
          >
            Ver mais
          </button>
        )}
      </div>
      <img
        src={phoneImage}
        alt="Project Preview"
        className="hidden lg:block relative w-full h-[59.07vh] ml-10"
        loading="lazy"
      />
    </div>
  );
});

export default ProjectCard;

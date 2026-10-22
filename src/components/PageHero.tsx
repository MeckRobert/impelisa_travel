import Image from "next/image";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export default function PageHero({ label, title, subtitle, imageSrc, imageAlt }: PageHeroProps) {
  return (
    <section className="on-media relative h-[420px] md:h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 pt-20">
        <p className="section-label mb-3">{label}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}

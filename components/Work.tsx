"use client";
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { Lock, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const projects = [
  {
    id: 'eventlabs',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    span: 'col-span-1 md:col-span-2',
    image: '/assets/EventLabsPreview.png',
    link: 'https://event-labs-three.vercel.app/',
    statusKey: 'liveSystem',
    isLive: true
  },
  {
    id: 'manga',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Elysia.js', 'Cloudflare'],
    span: 'col-span-1',
    statusKey: 'inDevelopment',
    isLive: false
  },
  {
    id: 'clipper',
    tags: ['Python', 'Next.js', 'TypeScript', 'Modal', 'AWS', 'GemeniAPI', 'FFmpeg'],
    span: 'col-span-1',
    statusKey: 'inDevelopment',
    isLive: false
  },
];

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[0];
}) => {
  const t = useTranslations('Work'); // Access 'Work' namespace
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const isLive = project.isLive;
  const ContentWrapper = isLive ? 'a' : 'div';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={isLive ? { y: -5 } : {}}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 ${project.span}`}
    >
      <ContentWrapper href={project.link} target={isLive ? "_blank" : undefined} className="block h-full relative z-10">

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            left: spotlightX,
            top: spotlightY,
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 60%)',
          }}
        />

        {isLive && project.image && (
          <div className="absolute inset-0 z-0 select-none">
            <Image
              src={project.image}
              alt={t(`items.${project.id}.title`)}
              fill
              className="object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/40 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
        )}

        {!isLive && (
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-zinc-900 to-zinc-950" />
          </div>
        )}

        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[320px] md:min-h-[380px]">

          <div className="mt-auto">
            <div className="flex items-center justify-between gap-4 mb-4">
              {isLive ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-medium text-emerald-200 tracking-wide uppercase">
                    {t('liveSystem')}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-300 tracking-wide uppercase">
                    {t('inDevelopment')}
                  </span>
                </div>
              )}

              {isLive && (
                <div className="p-2 rounded-full bg-white/10 border border-white/10 text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              )}
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
              {t(`items.${project.id}.title`)}
            </h3>

            <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6 max-w-md drop-shadow-sm">
              {t(`items.${project.id}.description`)}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </ContentWrapper>
    </motion.div>
  );
};

export const Work = () => {
  const t = useTranslations('Work');

  return (
    <section id="work" className="section-padding py-32 bg-background">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              {t('title')}
            </h2>
            <div className="h-1 w-20 bg-foreground"></div>
          </div>
          <p className="text-xl text-muted-foreground font-light max-w-sm text-right md:text-left">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

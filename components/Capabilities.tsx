"use client";
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';
import { Hand } from 'lucide-react';
import { useTranslations } from 'next-intl';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'PostgreSQL', 'SaaS Architecture', 'Docker',
  'AWS', 'System Design', 'Bun', 'Database Schema',
  'Shadcn/UI', 'Server Actions', 'Prisma', 'Drizzle ORM',
  'Full-Stack Dev', 'Cloudflare', 'Vercel', 'PHP / Laravel', 'Elysia.js', 'Figma'
];

interface PillPosition {
  id: string;
  x: number;
  y: number;
  angle: number;
  label: string;
}

export const Capabilities = () => {
  const t = useTranslations('Capabilities');
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [pillPositions, setPillPositions] = useState<PillPosition[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 500 });

  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // Check if container exists, is in view, and ensure we haven't already started (engineRef.current check)
    if (!containerRef.current || !isInView || engineRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 500;
    setContainerSize({ width, height });

    // Create Matter.js engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 },
    });
    engineRef.current = engine;

    // Create walls
    const wallOptions = {
      isStatic: true,
      restitution: 0.4,
      friction: 0.5,
      render: { visible: false }
    };

    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 50, width + 400, 100, wallOptions),
      Matter.Bodies.rectangle(-50, height / 2, 100, height + 400, wallOptions),
      Matter.Bodies.rectangle(width + 50, height / 2, 100, height + 400, wallOptions),
    ];

    // Create skill pills
    const pills = skills.map((skill, index) => {
      const pillWidth = skill.length * 9 + 50;
      const pillHeight = 46;

      const xSpacing = width / 5;
      const startX = width * 0.1 + (index % 5) * xSpacing;

      return Matter.Bodies.rectangle(
        startX + (Math.random() - 0.5) * 50,
        -Math.random() * 300 - 50,
        pillWidth,
        pillHeight,
        {
          chamfer: { radius: 23 },
          restitution: 0.4,
          friction: 0.3,
          frictionAir: 0.02,
          label: skill,
        }
      );
    });

    // Mouse control
    const mouse = Matter.Mouse.create(container);
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, [...walls, ...pills, mouseConstraint]);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Initial position update to valid coords immediately
    const initialPositions = pills.map((pill) => ({
      id: pill.id.toString(),
      x: pill.position.x,
      y: pill.position.y,
      angle: pill.angle,
      label: pill.label as string,
    }));
    setPillPositions(initialPositions);

    const updatePositions = () => {
      const positions = pills.map((pill) => ({
        id: pill.id.toString(),
        x: pill.position.x,
        y: pill.position.y,
        angle: pill.angle,
        label: pill.label as string,
      }));
      setPillPositions(positions);
    };

    Matter.Events.on(engine, 'afterUpdate', updatePositions);

    return () => {
      Matter.Events.off(engine, 'afterUpdate', updatePositions);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      engineRef.current = null;
    };
  }, [isInView]);

  // Handle resize - just reset bounds if needed, or simple prevention of errors
  useEffect(() => {
  }, []);

  return (
    <section id="capabilities" className="section-padding py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            {t('instruction')} <Hand className="w-5 h-5" />
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-3xl border border-border/40 bg-secondary/20"
          style={{ height: containerSize.height }}
        >
          {/* Render pills as React components mapped to physics positions */}
          {pillPositions.map((pill) => {
            const pillWidth = pill.label.length * 9 + 50;
            return (
              <div
                key={pill.id}
                className="absolute bg-white dark:bg-zinc-800 text-foreground px-6 py-3 rounded-full text-sm font-medium cursor-grab active:cursor-grabbing select-none whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-zinc-200/80 dark:border-zinc-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow"
                style={{
                  left: 0,
                  top: 0,
                  width: pillWidth,
                  height: 46,
                  transform: `translate(${pill.x - pillWidth / 2}px, ${pill.y - 23}px) rotate(${pill.angle}rad)`,
                  willChange: 'transform',
                }}
              >
                {pill.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

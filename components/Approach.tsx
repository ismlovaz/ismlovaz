"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const Approach = () => {
	const t = useTranslations('Approach');
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end end"]
	});

	const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	const smoothBeamHeight = useSpring(beamHeight, { stiffness: 400, damping: 40 });

	const steps = ['0', '1', '2', '3'];

	return (
		<section
			ref={containerRef}
			id="approach"
			className="relative py-24 md:py-40 bg-transparent overflow-hidden"
		>
			<div className="max-w-5xl mx-auto px-6 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-20 md:mb-32"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
						{t('title')}
					</h2>
					<p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl font-light">
						{t('subtitle')}
					</p>
				</motion.div>

				<div className="relative">
					{/* Beam Line */}
					<div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 md:transform-none">
						<motion.div
							style={{ height: smoothBeamHeight }}
							className="w-full bg-gradient-to-b from-transparent via-cyan-500 to-blue-600 opacity-80 shadow-[0_0_15px_1px_rgba(6,182,212,0.4)]"
						/>
					</div>

					<div className="space-y-24 md:space-y-40 pb-20">
						{steps.map((stepKey, index) => (
							<TimelineStep
								key={index}
								stepKey={stepKey}
								index={index}
							/>
						))}
					</div>
				</div>

				{/* CTA for Terms */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="text-center pb-20 mt-10"
				>
					<p className="text-muted-foreground mb-4 text-sm font-medium uppercase tracking-wider opacity-70">
						{useTranslations('Terms.cta')('approachText')}
					</p>
					<a
						href="/terms"
						className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 text-lg font-semibold group"
					>
						{useTranslations('Terms.cta')('approachButton')}
						<span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
					</a>
				</motion.div>
			</div>
		</section>
	);
};

const TimelineStep = ({ stepKey, index }: { stepKey: string, index: number }) => {
	const t = useTranslations('Approach.steps');
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

	return (
		<div ref={ref} className={`flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-20 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

			<div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center transition-all duration-700 ease-out`}
			>
				<div
					className={`w-3 h-3 rounded-full transition-colors duration-500 ${isInView ? 'bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]' : 'bg-muted-foreground/30 border border-muted-foreground/30'}`}
				/>

				{isInView && (
					<motion.div
						initial={{ scale: 1, opacity: 0.5 }}
						animate={{ scale: 3, opacity: 0 }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="absolute inset-0 bg-cyan-500/30 rounded-full"
					/>
				)}
			</div>

			<div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 15 }}
					transition={{ duration: 0.5 }}
					className="group cursor-default relative"
				>
					<div className={`text-6xl md:text-8xl font-sans font-bold absolute -top-10 md:-top-16 opacity-0 md:opacity-100 select-none pointer-events-none transition-colors duration-700 ${index % 2 === 0 ? 'right-0 text-right' : 'left-0 text-left'} ${isInView ? 'text-foreground/5' : 'text-foreground/5'}`}>
						0{index + 1}
					</div>

					<div className="relative z-10">
						<span className={`inline-block mb-2 text-xs font-mono tracking-widest text-cyan-500 uppercase ${isInView ? 'opacity-100' : 'opacity-60'}`}>
							Step 0{index + 1}
						</span>
						<h3 className={`text-2xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${isInView ? 'text-foreground' : 'text-muted-foreground'}`}>
							{t(`${stepKey}.title`)}
						</h3>
						<p className={`leading-relaxed text-base md:text-lg max-w-md transition-colors duration-500 ${index % 2 === 0 ? 'md:ml-auto' : ''} ${isInView ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
							{t(`${stepKey}.description`)}
						</p>
					</div>
				</motion.div>
			</div>

			<div className="hidden md:block w-1/2" />
		</div>
	)
}

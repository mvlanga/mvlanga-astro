import type { CollectionEntry } from "astro:content";
import { useOnResize } from "@/utils/useOnResize.ts";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ProjectsProp = { projects: CollectionEntry<"projects">[] };

export const Projects = ({ projects }: ProjectsProp) => {
	const targetRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const [scrollWidth, setScrollWidth] = useState<number>(0);

	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	useEffect(() => {
		if (scrollContainerRef.current === null) {
			return;
		}

		setScrollWidth(
			scrollContainerRef.current.scrollWidth -
				scrollContainerRef.current.clientWidth,
		);

		useOnResize(() => {
			if (scrollContainerRef.current === null) {
				return;
			}

			setScrollWidth(
				scrollContainerRef.current.scrollWidth -
					scrollContainerRef.current.clientWidth,
			);
		});
	}, []);

	const scrollOffset = useTransform(
		scrollYProgress,
		[0, 1],
		[0, scrollWidth * -1],
	);

	return (
		<section ref={targetRef}>
			<div className="relative" style={{ height: `${projects.length * 30}vw` }}>
				<div className="container sticky top-0 flex h-svh items-center overflow-hidden">
					<motion.div
						ref={scrollContainerRef}
						className="flex gap-32"
						style={{ translateX: scrollOffset }}
					>
						{projects.map(
							(
								{ id, data: { title, customer, year, cover, coverOnHover } },
								index,
							) => (
								<div
									key={title}
									className="flex w-1/2 flex-[0_0_auto] flex-col gap-8"
								>
									<a
										className="relative h-full max-h-[60vh] w-full overflow-hidden rounded-2xl"
										href={`project/${id}`}
									>
										<img
											className="h-full w-full object-cover"
											src={cover.src}
											alt={title}
										/>
										<img
											className="absolute top-0 left-0 z-10 h-full w-full object-cover opacity-0 transition-all duration-500 hover:scale-110 hover:opacity-100"
											src={coverOnHover.src}
											alt={title}
										/>
									</a>
									<a href={`project/${id}`} className="flex flex-col gap-6">
										<span className="text-neutral-400 text-xl">
											{customer}, {year}
										</span>
										<h3 className="max-w-prose text-4xl">{title}</h3>
									</a>
								</div>
							),
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

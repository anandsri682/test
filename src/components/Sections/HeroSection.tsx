'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoveRight } from 'lucide-react';

const HERO_IMAGE = '/hero-office.jpg';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* =========================================================
          SUBTLE WHITE HERO BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Very light blue atmosphere */}
        <div className="absolute -left-48 -top-48 h-[550px] w-[550px] rounded-full bg-[#087FF5]/[0.025] blur-[130px]" />

        {/* Very light teal atmosphere */}
        <div className="absolute -bottom-48 -right-48 h-[550px] w-[550px] rounded-full bg-[#13B89A]/[0.025] blur-[130px]" />

        {/* Small orange detail */}
        <div className="absolute right-[9%] top-[18%] h-2 w-2 rounded-full bg-[#FF6A00]" />
      </div>

      {/* =========================================================
          HERO CONTAINER
      ========================================================= */}
      <div className="relative mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">

        <div className="grid min-h-[650px] items-center lg:grid-cols-[0.92fr_1.08fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 max-w-2xl pb-12 lg:pb-20"
          >

            {/* Brand line */}
            <div className="mb-7 flex items-center gap-3">

              <div className="flex items-center gap-1.5">
                <span className="h-[3px] w-8 rounded-full bg-[#087FF5]" />
                <span className="h-[3px] w-4 rounded-full bg-[#13B89A]" />
                <span className="h-[3px] w-2 rounded-full bg-[#FF6A00]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B2A5B] sm:text-xs">
                AVM Smart Solutions
              </span>

            </div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}
            <h1
              className="
                text-[43px]
                font-bold
                leading-[1.04]
                tracking-[-0.04em]
                text-[#0B2A5B]
                sm:text-[54px]
                lg:text-[62px]
                xl:text-[70px]
              "
            >
              Digital Solutions
              <br />

              <span className="relative inline-block">

                <span
                  className="
                    bg-gradient-to-r
                    from-[#087FF5]
                    via-[#13B89A]
                    to-[#63C745]
                    bg-clip-text
                    text-transparent
                  "
                >
                  for Real Business
                </span>

                {/* Orange dot */}
                <span className="absolute -right-5 top-0 h-2 w-2 rounded-full bg-[#FF6A00]" />

              </span>

              <br />

              <span className="text-[#0B2A5B]">
                Growth.
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                mt-7
                max-w-xl
                text-[15px]
                leading-7
                text-slate-600
                sm:text-[17px]
                sm:leading-8
              "
            >
              We build custom websites, mobile applications and digital
              solutions that help businesses work smarter, reach more
              customers and grow with confidence.
            </motion.p>

            {/* =================================================
                BUTTONS
            ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  bg-[#087FF5]
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_25px_rgba(8,127,245,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#066FD6]
                  hover:shadow-[0_12px_30px_rgba(8,127,245,0.25)]
                "
              >
                Get Started

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/portfolio"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#0B2A5B]
                  transition-all
                  duration-300
                  hover:border-[#087FF5]
                  hover:bg-[#F6F9FC]
                  hover:text-[#087FF5]
                "
              >
                View Our Work

                <MoveRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

            </motion.div>

            {/* =================================================
                SERVICES
            ================================================= */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.45,
              }}
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                text-xs
                text-slate-500
                sm:text-sm
              "
            >

              <span className="font-medium">
                Web Development
              </span>

              <span className="h-1 w-1 rounded-full bg-[#087FF5]" />

              <span className="font-medium">
                Mobile Apps
              </span>

              <span className="h-1 w-1 rounded-full bg-[#13B89A]" />

              <span className="font-medium">
                Custom Software
              </span>

            </motion.div>

          </motion.div>


          {/* =====================================================
              RIGHT SIDE IMAGE
              NO CARD
              NO BORDER
              NO ROUNDED CONTAINER
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              h-[430px]
              sm:h-[520px]
              lg:h-[650px]
              lg:-mr-10
            "
          >

            {/* =================================================
                MAIN IMAGE
            ================================================= */}
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  'polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 18%)',
              }}
            >

              <Image
                src={HERO_IMAGE}
                alt="AVM Smart Solutions digital team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />

              {/* LEFT WHITE BLEND */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-[48%]
                "
                style={{
                  background:
                    'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.94) 12%, rgba(255,255,255,0.68) 28%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0) 100%)',
                }}
              />

              {/* TOP WHITE BLEND */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-28
                "
                style={{
                  background:
                    'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0) 100%)',
                }}
              />

              {/* BOTTOM WHITE BLEND */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-32
                "
                style={{
                  background:
                    'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.65) 25%, rgba(255,255,255,0) 100%)',
                }}
              />

            </div>


            {/* =================================================
                DIAGONAL BLUE / TEAL ARROW
            ================================================= */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-16
                left-0
                hidden
                h-28
                w-40
                lg:block
              "
              style={{
                clipPath:
                  'polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%, 35% 50%)',
                background:
                  'linear-gradient(135deg, #087FF5 0%, #13B89A 100%)',
              }}
            />


            {/* =================================================
                ORANGE DETAIL
            ================================================= */}
            <div
              className="
                absolute
                right-[7%]
                top-[12%]
                h-[3px]
                w-14
                rounded-full
                bg-[#FF6A00]
              "
            />


            {/* =================================================
                SMALL ARROW DETAIL
            ================================================= */}
            <div
              className="
                absolute
                bottom-[19%]
                right-[12%]
                hidden
                items-center
                gap-2
                lg:flex
              "
            >

              <span className="h-[2px] w-10 bg-[#087FF5]" />

              <span
                className="
                  h-2
                  w-2
                  rotate-45
                  border-r-2
                  border-t-2
                  border-[#13B89A]
                "
              />

            </div>

          </motion.div>

        </div>
      </div>


      {/* =========================================================
          BOTTOM BRAND LINE
      ========================================================= */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[2px]
          bg-gradient-to-r
          from-[#087FF5]
          via-[#13B89A]
          to-[#FF6A00]
          opacity-40
        "
      />

    </section>
  );
}
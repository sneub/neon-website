'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import infoSvg from 'components/pages/partners/apply/images/info.svg';
import AnimatedButton from 'components/shared/animated-button';
import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import Tooltip from 'components/shared/tooltip';
import LINKS from 'constants/links';
import CheckIcon from 'icons/check.inline.svg';
import sendGtagEvent from 'utils/send-gtag-event';
import sendSegmentEvent from 'utils/send-segment-event';

const items = [
  {
    type: 'Free Tier',
    price: '$0 <span>/month</span>',
    description: 'Generous free tier for hobby projects, prototypes, and learning Neon	',
    features: [
      { title: '1 project, 10 branches' },
      { title: 'Shared Compute and 0.5GB storage' },
      { title: 'Project Sharing, Logical Replication' },
      { title: 'Community support' },
    ],
    button: {
      url: LINKS.signup,
      text: 'Start for free',
      theme: 'white-outline',
      event: 'pricing_hero_free_btn_click',
    },
  },
  {
    type: 'Launch',
    price: '<span>From</span> $19 <span>/month</span>',
    description: 'All the resources, features and support you need to launch.',
    features: [
      { title: '10 projects w/500 branches each' },
      {
        title: 'Preloaded w/$63 of usage',
        tooltip: '300 CU-hours compute <br/> and 10GB storage.',
      },
      { title: 'Autoscaling up to 4 CUs' },
      { title: 'Unlocks Read Replicas' },
      { title: 'Expert support' },
    ],
    button: {
      url: LINKS.signup,
      text: 'Get started',
      theme: 'primary',
      event: 'pricing_hero_pro_btn_click',
    },
  },
  {
    type: 'Scale',
    price: '<span>From</span> $69 <span>/month</span>',
    description: 'Full platform and support access, designed for scaling production workloads.',
    features: [
      { title: '50 projects w/500 branches each' },
      {
        title: 'Preloaded with $195 of usage',
        tooltip: '750 CU-hours compute <br/> and 50GB storage.',
      },
      { title: 'Autoscaling up to 7 CUs' },
      { title: 'Unlocks key security features' },
      { title: 'Priority support' },
    ],
    button: {
      url: LINKS.signup,
      text: 'Get started',
      theme: 'white-outline',
      event: 'pricing_hero_pro_btn_click',
    },
  },
  {
    type: 'Enterprise',
    price: 'Custom',
    description: 'Custom plans for large teams and database fleets.',
    features: [
      { title: 'Custom pricing with discounts' },
      { title: 'Higher resource limits' },
      { title: 'Customer-Owned S3' },
      { title: 'Enterprise support' },
    ],
    button: {
      url: LINKS.contactSales,
      text: 'Request trial',
      theme: 'white-outline',
      event: 'pricing_hero_custom_btn_click',
    },
  },
];

const scaleCardBorderVariants = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: [0, 0.4, 0.2, 1, 0.5, 1],
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Hero = () => {
  const [isLoad, setIsLoad] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start('to');
  }, [controls]);

  useEffect(() => {
    setIsLoad(true);
  }, []);

  return (
    <section className="hero safe-paddings overflow-hidden pt-36 2xl:pt-[150px] xl:pt-[120px] lg:pt-[52px] md:pt-[40px]">
      <Container className="flex flex-col items-center" size="medium">
        <Heading
          className="inline-flex flex-col text-center font-medium !leading-none tracking-tighter md:text-4xl"
          tag="h1"
          size="lg"
        >
          <span>Goodbye Infrastructure.</span>{' '}
          <span className="text-pricing-primary-1">Hello, Serverless Postgres.</span>
        </Heading>
        <p className="mx-auto mt-5 max-w-[620px] text-center text-xl font-light leading-snug xl:mt-4 xl:max-w-[570px] xl:text-lg md:mt-3 md:text-base">
          Neon brings serverless architecture to PostgreSQL, which allows us to offer you flexible
          usage and volume-based plans.
        </p>
        <div className="relative mx-auto mt-16 xl:mt-12 lg:w-full lg:max-w-[704px] md:mt-9">
          <h2 className="sr-only">Neon pricing plans</h2>
          <ul className="grid-gap relative z-10 grid grid-cols-4 xl:grid-cols-2 lg:gap-y-4 md:grid-cols-1 md:gap-y-6">
            {items.map(({ type, price, description, features, button }, index) => {
              const isScalePlan = type === 'Scale';

              return (
                <li
                  className={clsx('group relative rounded-[10px]', isScalePlan && 'xl:-order-1')}
                  key={index}
                  onPointerEnter={() => {
                    if (isScalePlan) {
                      controls.start('to');
                    }
                  }}
                >
                  <Link
                    className={clsx(
                      !isScalePlan &&
                        'border border-transparent bg-gray-new-8 group-hover:border-gray-new-15 group-hover:bg-gray-new-10',
                      'relative z-10 flex min-h-full flex-col rounded-[10px]  px-7 pb-9 pt-5 transition-colors duration-500 xl:px-6 xl:py-5 sm:p-5'
                    )}
                    to={button.url}
                    onClick={() => {
                      sendGtagEvent(button.event);
                      sendSegmentEvent(button.event);
                    }}
                  >
                    <div className="mb-6 flex flex-col border-b border-dashed border-gray-new-20 pb-5 xl:mb-5">
                      <h3
                        className={clsx(
                          isScalePlan && 'text-green-45',
                          'text-xl font-medium leading-none tracking-tight xl:text-lg'
                        )}
                      >
                        {type}
                      </h3>
                      <p
                        className="mt-8 text-[36px] font-light leading-none tracking-tighter xl:mt-5 xl:text-[32px] md:mt-4 [&_span]:text-[28px] [&_span]:font-light [&_span]:-tracking-[0.06em] [&_span]:text-gray-new-50"
                        dangerouslySetInnerHTML={{ __html: price }}
                      />
                      {isScalePlan ? (
                        <AnimatedButton
                          className="mt-7 w-full !bg-green-45 !py-4 !text-lg !font-medium tracking-tight group-hover:!bg-[#00ffaa] xl:mt-7 sm:max-w-none"
                          animationColor="#00e599"
                          theme="primary"
                          size="sm"
                          isAnimated
                        >
                          {button.text}
                        </AnimatedButton>
                      ) : (
                        <Button
                          className="mt-7 w-full bg-gray-new-15 !py-4 !text-lg !font-medium tracking-tight xl:mt-7 sm:max-w-none"
                          size="sm"
                        >
                          {button.text}
                        </Button>
                      )}
                      <p className="mt-9 font-light leading-snug tracking-tight  2xl:min-h-[66px] xl:mt-8 xl:min-h-[44px] lg:min-h-max">
                        {description}
                      </p>
                    </div>
                    <div className="mt-auto flex grow flex-col">
                      <ul className="flex flex-col flex-wrap gap-y-4">
                        {features.map(({ title, tooltip }, index) => (
                          <li
                            className="relative pl-6 leading-tight tracking-tight text-gray-new-70"
                            key={index}
                          >
                            <CheckIcon
                              className={clsx(
                                isScalePlan ? 'text-green-45' : 'text-gray-new-70',
                                'absolute left-0 top-[2px] h-4 w-4 '
                              )}
                              aria-hidden
                            />
                            <span
                              data-tooltip-id={tooltip && `${type}_tooltip_${index}`}
                              data-tooltip-html={tooltip && tooltip}
                            >
                              {title}
                              {tooltip && (
                                <img
                                  className="relative -top-px ml-1.5 inline"
                                  src={infoSvg}
                                  width={14}
                                  height={14}
                                  alt=""
                                  loading="lazy"
                                  aria-hidden
                                />
                              )}
                            </span>
                            {tooltip && (
                              <Tooltip
                                className="w-sm z-20"
                                id={`${type}_tooltip_${index}`}
                                place="top-center"
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                  {isScalePlan && (
                    <LazyMotion features={domAnimation}>
                      <m.span
                        className={clsx(
                          'pointer-events-none absolute left-0 top-0 z-20 h-full w-full rounded-[10px] border border-green-45 transition-colors duration-300 md:!opacity-100',
                          isLoad && '!opacity-100'
                        )}
                        initial="from"
                        exit="exit"
                        variants={scaleCardBorderVariants}
                        animate={controls}
                        aria-hidden
                      />
                    </LazyMotion>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-16 text-center text-lg font-light leading-snug">
          Not sure which plan is right for you?
          <br />
          Explore the{' '}
          <Link
            className="inline-block decoration-1 underline-offset-4 hover:!decoration-green-45/0"
            to="#plans"
            theme="green-underlined"
          >
            detailed plan comparison
          </Link>
          .
        </p>
      </Container>
    </section>
  );
};

export default Hero;

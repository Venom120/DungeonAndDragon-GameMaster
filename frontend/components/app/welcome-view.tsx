import { motion } from "motion/react";
import { Button } from '@/components/livekit/button';
import { SwordIcon, DiceSixIcon, SparkleIcon, BookIcon } from "@phosphor-icons/react";

function WelcomeIllustration() {
  return (
    <div className="relative mb-6">
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="flex items-center justify-center gap-4">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0,
            }}
          >
            <SwordIcon size={48} weight="duotone" className="text-primary magic-glow" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <DiceSixIcon size={56} weight="duotone" className="text-gold" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
          >
            <BookIcon size={48} weight="duotone" className="text-primary magic-glow" />
          </motion.div>
        </div>
        {/* Magic sparkles */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute -top-4 -right-4"
        >
          <SparkleIcon size={24} weight="fill" className="text-gold" />
        </motion.div>
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4"
        >
          <SparkleIcon size={20} weight="fill" className="text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="h-full w-full flex items-center justify-center p-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center max-w-2xl"
      >
        <WelcomeIllustration />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground text-5xl font-bold mb-4 font-serif tracking-wide"
        >
          <span className="magic-glow bg-foreground/5 rounded-2xl px-4 py-2">D&D Game Master</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground max-w-prose pt-2 leading-7 font-medium text-lg"
        >
          Embark on an epic fantasy adventure with your AI Game Master
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground max-w-xl pt-4 text-base leading-6"
        >
          Speak your actions aloud and watch your story unfold. Face challenges, meet mysterious characters, and make choices that shape your destiny.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="w-72 h-14 text-lg font-bold font-serif magic-glow hover:scale-105 transition-transform"
          >
            <DiceSixIcon size={24} weight="duotone" className="mr-2" />
            {startButtonText}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <SwordIcon size={16} weight="duotone" className="text-primary" />
            <span>Real-time voice interaction</span>
          </div>
          <div className="flex items-center gap-2">
            <BookIcon size={16} weight="duotone" className="text-primary" />
            <span>Dynamic storytelling</span>
          </div>
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="fixed bottom-6 left-0 flex w-full items-center justify-center"
      >
        <p className="text-muted-foreground max-w-prose text-xs leading-5 font-normal text-pretty">
          Need help getting set up? Check out the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.livekit.io/agents/start/voice-ai/"
            className="underline hover:text-foreground transition-colors"
          >
            Voice AI quickstart
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};

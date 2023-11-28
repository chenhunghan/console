import * as React from "react";
import * as Progress from "@radix-ui/react-progress";

export const CreateOrgProgress = ({ activeStep }: { activeStep: Step }) => {
  const progress = React.useMemo(() => {
    switch (activeStep) {
      case "pick-plan":
        return 0;
      case "fill-in-details":
        return 50;
      case "invite":
        return 100;
    }
  }, [activeStep]);

  <div className="relative flex items-center justify-between">
    <ProgressItem
      step="pick-plan"
      activeStep={activeStep}
      title="Your plan"
      description="Pick a plan to star your organisation"
    />
    <ProgressItem
      step="fill-in-details"
      activeStep={activeStep}
      title="Organization details"
      description="A few details about your organisation"
    />
    <ProgressItem
      step="invite"
      activeStep={activeStep}
      title="Invite your team"
      description="Start collaborating with your team"
    />
    <div className="absolute top-1/2 -translate-y-1/2">
      <Progress.Root
        className="relative top-1/2 h-8 w-full overflow-hidden rounded bg-semantic-bg-line"
        value={progress}
      >
        <Progress.Indicator
          className="h-full w-full flex-1 bg-semantic-accent-default transition-all"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  </div>;
};

export const ProgressItem = ({
  step,
  activeStep,
  title,
  description,
}: {
  step: Step;
  activeStep: Step;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border border-semantic-bg-base-bg">
        <div className="h-2 w-2 rounded-full bg-semantic-bg-alt-primary"></div>
      </div>
      <p className="text-semantic-fg-primary product-body-text-3-semibold">
        {title}
      </p>
      <p className=" text-semantic-fg-primary product-body-text-3-regular">
        {description}
      </p>
    </div>
  );
};

export type Step = "pick-plan" | "fill-in-details" | "invite";

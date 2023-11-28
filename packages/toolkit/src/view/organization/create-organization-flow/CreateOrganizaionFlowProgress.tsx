import cn from "clsx";
import * as React from "react";
import * as Progress from "@radix-ui/react-progress";
import {
  CreateOrganizationFlowStep,
  useCreateOrganizationFlowContext,
} from "./CreateOrganizationFlow";
import { ElementPosition, Icons } from "@instill-ai/design-system";
import { Nullable } from "../../../lib";

export const CreateOrganizaionFlowProgress = ({
  className,
}: {
  className?: string;
}) => {
  const { activeStep } = useCreateOrganizationFlowContext();

  const progress = React.useMemo(() => {
    switch (activeStep) {
      case "pick-plan":
        return 50;
      case "fill-in-details":
        return 100;
      case "invite":
        return 100;
    }
  }, [activeStep]);

  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const thirdItemRef = React.useRef<HTMLDivElement>(null);

  const [progressStart, setProgressStart] =
    React.useState<Nullable<ElementPosition>>(null);
  const [progressEnd, setProgressEnd] =
    React.useState<Nullable<ElementPosition>>(null);

  React.useLayoutEffect(() => {
    if (firstItemRef.current && thirdItemRef.current) {
      const firstItemPosition = firstItemRef.current.getBoundingClientRect();
      const thirdItemPosition = thirdItemRef.current.getBoundingClientRect();

      setProgressStart({
        x: firstItemPosition.x,
        y: firstItemPosition.y,
        width: firstItemPosition.width,
        height: firstItemPosition.height,
      });

      setProgressEnd({
        x: thirdItemPosition.x,
        y: thirdItemPosition.y,
        width: thirdItemPosition.width,
        height: thirdItemPosition.height,
      });
    }
  }, []);

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <ProgressItem
        ref={firstItemRef}
        isActive={activeStep === "pick-plan"}
        isFinished={activeStep !== "pick-plan"}
        title="Your plan"
        description="Pick a plan to star your organisation"
      />
      <ProgressItem
        isActive={activeStep === "fill-in-details"}
        isFinished={
          activeStep !== "pick-plan" && activeStep !== "fill-in-details"
        }
        title="Organization details"
        description="A few details about your organisation"
      />
      <ProgressItem
        ref={thirdItemRef}
        isActive={activeStep === "invite"}
        isFinished={
          activeStep !== "pick-plan" &&
          activeStep !== "fill-in-details" &&
          activeStep !== "invite"
        }
        title="Invite your team"
        description="Start collaborating with your team"
      />
      <div
        className="absolute w-full"
        style={{
          top: progressStart
            ? `${progressStart?.y + progressStart?.height / 2}px`
            : undefined,
          left: progressStart
            ? `${progressStart?.x + progressStart?.width / 2}px`
            : undefined,
          width:
            progressStart && progressEnd
              ? `${progressEnd.x - progressStart.x}px`
              : undefined,
        }}
      >
        <Progress.Root
          className="relative h-0.5 overflow-hidden rounded bg-semantic-bg-line"
          value={progress}
        >
          <Progress.Indicator
            className="h-full w-full flex-1 bg-semantic-accent-default transition-all"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      </div>
    </div>
  );
};

export const ProgressItem = React.forwardRef<
  HTMLDivElement,
  {
    isActive: boolean;
    isFinished: boolean;
    title: string;
    description: string;
  }
>(({ isActive, isFinished, title, description }, ref) => {
  return (
    <div className="z-30 flex w-[320px] flex-col gap-y-3">
      {isFinished ? (
        <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-semantic-accent-default">
          <Icons.Check className="h-4 w-4 stroke-semantic-bg-primary" />
        </div>
      ) : (
        <div
          ref={ref}
          className={cn(
            "mx-auto flex h-6 w-6 items-center justify-center rounded-full first-letter:mb-3",
            isActive
              ? "border-semantic-accent-default bg-semantic-accent-default ring-4 ring-[#316FED] ring-opacity-25 ring-offset-0"
              : "border-2 border-semantic-bg-line bg-semantic-bg-primary"
          )}
        >
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              isActive
                ? "bg-semantic-bg-primary"
                : "bg-semantic-secondary-bg-alt"
            )}
          />
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-center text-semantic-fg-primary product-body-text-3-semibold">
          {title}
        </p>
        <p className=" text-center text-semantic-fg-primary product-body-text-3-regular">
          {description}
        </p>
      </div>
    </div>
  );
});
ProgressItem.displayName = "ProgressItem";

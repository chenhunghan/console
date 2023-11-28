import { Button, Tag } from "@instill-ai/design-system";
import { BillingSwitch } from "./BillingSwitch";
import { PricingCard } from "./PricingCard";
import { StepHead } from "./StepHead";
import { useCreateOrganizationFlowContext } from "./CreateOrganizationFlow";

export const PickPlanStep = () => {
  const { setActiveStep } = useCreateOrganizationFlowContext();

  return (
    <div className="flex flex-col">
      <StepHead
        title="Choose a plan for your new team"
        description="Simple pricing to build your unstructured data infrastructure "
      >
        <BillingSwitch />
      </StepHead>
      <div className="mx-auto flex flex-row gap-x-8">
        <PricingCard
          plan="team"
          planDescription="For small teams with advanced features"
          features={[
            "Up to 5 team members",
            "Dedicated compute resource for high model inference speed",
            "Community support in Discord",
            "Dedicated support",
          ]}
          featureDescription={
            <p className="text-semantic-fg-secondary product-body-text-3-regular">
              Everything in Pro plus...
            </p>
          }
          headLable={
            <Tag variant="lightBlue" size="sm">
              Best value
            </Tag>
          }
          cta={
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                if (setActiveStep) {
                  setActiveStep("fill-in-details");
                }
              }}
            >
              Choose team plan
            </Button>
          }
          highlighted={true}
          className="w-[414px]"
        />
        <PricingCard
          plan="enterprise"
          planDescription="For small teams with advanced features"
          features={[
            "Unlimited team members",
            "Dedicated infrastructure",
            "On-prem deployment",
            "Dedicated solution engineers",
          ]}
          featureDescription={
            <p className="text-semantic-fg-secondary product-body-text-3-regular">
              Everything in Team plus...
            </p>
          }
          cta={
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                if (setActiveStep) {
                  setActiveStep("fill-in-details");
                }
              }}
            >
              Talk to us
            </Button>
          }
          className="w-[414px]"
        />
      </div>
    </div>
  );
};

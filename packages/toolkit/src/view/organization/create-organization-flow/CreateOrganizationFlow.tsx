import * as React from "react";
import { PickPlanStep } from "./PickPlanStep";
import { CreateOrganizaionFlowProgress } from "./CreateOrganizaionFlowProgress";

export type CreateOrganizationFlowBilling = "monthly" | "annually";

export type CreateOrganizationFlowStep =
  | "pick-plan"
  | "fill-in-details"
  | "invite";

type CreateOrganizationFlowValue = {
  billing: CreateOrganizationFlowBilling;
  setBilling?: (value: CreateOrganizationFlowBilling) => void;
  activeStep: CreateOrganizationFlowStep;
  setActiveStep?: (value: CreateOrganizationFlowStep) => void;
};

const CreateOrganizationFlowContext =
  React.createContext<CreateOrganizationFlowValue>({
    billing: "annually",
    activeStep: "pick-plan",
  });

export const useCreateOrganizationFlowContext = () => {
  const context = React.useContext(CreateOrganizationFlowContext);
  if (context === undefined) {
    throw new Error(
      "useCreateOrganizationFlowContext must be used within a CreateOrganizationFlowProvider"
    );
  }
  return context;
};

export const CreateOrganizationFlow = () => {
  const [billing, setBilling] =
    React.useState<CreateOrganizationFlowBilling>("annually");

  const [activeStep, setActiveStep] =
    React.useState<CreateOrganizationFlowStep>("pick-plan");

  const context: CreateOrganizationFlowValue = React.useMemo(
    () => ({
      billing,
      setBilling: (value: CreateOrganizationFlowBilling) => {
        setBilling(value);
      },
      activeStep,
      setActiveStep: (value: CreateOrganizationFlowStep) => {
        setActiveStep(value);
      },
    }),
    [billing, activeStep]
  );

  return (
    <CreateOrganizationFlowContext.Provider value={context}>
      <div className="flex flex-col">
        <CreateOrganizaionFlowProgress className="mb-12" />
        {activeStep === "pick-plan" ? <PickPlanStep /> : null}
      </div>
    </CreateOrganizationFlowContext.Provider>
  );
};

import cn from "clsx";
import * as React from "react";
import { useCreateOrganizationFlowContext } from "./CreateOrganizationFlow";
import { InstillPricing } from "../../../constant/price";
import { Icons } from "@instill-ai/design-system";
import { InstillBillingTier } from "../../../lib";

export const PricingCard = ({
  plan,
  planDescription,
  features,
  featureDescription,
  headLable,
  cta,
  className,
  highlighted,
}: {
  plan: InstillBillingTier;
  planDescription: string;
  features: string[];
  featureDescription: React.ReactElement;
  headLable?: React.ReactElement;
  cta: React.ReactElement;
  className?: string;
  highlighted?: boolean;
}) => {
  const { billing } = useCreateOrganizationFlowContext();

  const price = React.useMemo(() => {
    if (plan === "team") {
      return billing === "annually"
        ? InstillPricing.team.annually
        : InstillPricing.team.monthly;
    }

    if (plan === "pro") {
      return billing === "annually"
        ? InstillPricing.pro.annually
        : InstillPricing.pro.monthly;
    }

    if (plan === "enterprise") {
      return "Custom";
    }

    if (plan === "free") {
      return "Free";
    }
  }, [billing, plan]);

  return (
    <React.Fragment>
      <style jsx>{`
        .highlighted {
          box-shadow: 0px 4px 12px 0px rgba(190, 211, 254, 1);
        }
      `}</style>
      <div
        className={cn(
          "flex flex-col rounded-md border bg-semantic-bg-primary",
          highlighted
            ? "highlighted border-semantic-accent-default"
            : "border-semantic-bg-line shadow",
          className
        )}
      >
        <div className="flex flex-col border-b border-semantic-bg-line p-8">
          {/* Pricing Head */}

          <div className="mb-4 flex flex-row justify-between">
            <p className="!capitalize text-semantic-fg-secondary product-body-text-2-semibold">
              {plan}
            </p>
            {headLable}
          </div>

          {/* Pricing Body */}

          <div className="mb-8 flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-1">
              <h2 className="text-semantic-fg-primary product-headings-heading-1">
                {typeof price === "number" ? `$${price}` : price}
              </h2>
              {plan === "pro" || plan === "team" ? (
                <p className="mb-auto text-semantic-fg-secondary product-body-text-2-medium">
                  {billing === "annually" ? "per month" : "per year"}
                </p>
              ) : null}
            </div>
            <p className="text-semantic-fg-disabled product-body-text-3-regular">
              {planDescription}
            </p>
          </div>

          {/* CTA */}

          <div className="flex flex-col gap-y-4">
            {cta}
            <p className="text-center text-semantic-fg-secondary product-body-text-3-medium">
              Get expert advice for free
            </p>
          </div>
        </div>

        <div className="flex flex-col p-8">
          {/* Feature Head */}

          <div className="mb-6 flex flex-col">
            <p className="text-semantic-fg-primary product-body-text-3-semibold">
              FEATURES
            </p>
            {featureDescription}
          </div>

          {/* Feature Body */}

          <div className="flex flex-col gap-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex flex-row gap-x-3">
                <Icons.CheckCircle className="h-4 w-4 stroke-semantic-fg-primary" />
                <p className="text-semantic-fg-secondary product-body-text-4-regular">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

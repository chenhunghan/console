import cn from "clsx";
import { useCreateOrganizationFlowContext } from "./CreateOrganizationFlow";

export const BillingSwitch = () => {
  const { billing, setBilling } = useCreateOrganizationFlowContext();

  return (
    <div className="flex flex-row">
      <p className="my-auto mr-6 product-body-text-3-semibold">Billing</p>
      <div className="flex flex-row rounded-sm border border-semantic-bg-line">
        <button
          className={cn(
            "rounded-l-sm px-4 py-2 text-semantic-fg-primary product-body-text-2-semibold",
            billing === "monthly"
              ? "bg-semantic-bg-line"
              : "bg-semantic-bg-primary hover:bg-semantic-bg-base-bg"
          )}
          onClick={() => {
            if (billing !== "monthly" && setBilling) setBilling("monthly");
          }}
        >
          Monthly
        </button>
        <button
          className={cn(
            "rounded-r-sm px-4 py-2 text-semantic-fg-primary product-body-text-2-semibold",
            billing === "annually"
              ? "bg-semantic-bg-line"
              : "bg-semantic-bg-primary hover:bg-semantic-bg-base-bg"
          )}
          onClick={() => {
            if (billing !== "annually" && setBilling) setBilling("annually");
          }}
        >
          Annually
        </button>
      </div>
    </div>
  );
};

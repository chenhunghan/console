import cn from "clsx";
import { getModelInstanceTaskToolkit } from "@instill-ai/design-system";
import { Nullable } from "../lib";

export type ModelTaskLabelProps = {
  task: Nullable<string>;
  /**
   * - Default is undefined
   */
  marginBottom?: string;
  /**
   * - Default is undefined
   */
  position?: string;
};

export const ModelTaskLabel = (props: ModelTaskLabelProps) => {
  const { task, marginBottom, position } = props;

  if (!task) {
    return (
      <div
        className={cn("flex gap-x-2 bg-white p-2", marginBottom, position)}
        data-testid="model-task-label"
      >
        <div className="h-[18px] w-[18px]" />
        <p className="my-auto flex !capitalize text-semantic-fg-primary product-body-text-4-regular">
          Unspecified
        </p>
      </div>
    );
  }

  const toolkit = getModelInstanceTaskToolkit(task);

  return (
    <div
      className={cn("flex gap-x-2 bg-white p-2", marginBottom, position)}
      data-testid="model-task-label"
    >
      {toolkit.getIcon("w-[18px] h-[18px] fill-semantic-fg-primary")}
      <p className="my-auto flex !capitalize text-semantic-fg-primary product-body-text-4-regular">
        {toolkit.label}
      </p>
    </div>
  );
};

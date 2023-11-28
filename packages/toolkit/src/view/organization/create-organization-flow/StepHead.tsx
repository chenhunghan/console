export const StepHead = ({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="mb-5 flex flex-row justify-between border-b border-semantic-bg-line pb-5">
      <div className="flex flex-col">
        <h2 className="text-semantic-fg-primary product-body-text-1-semibold">
          {title}
        </h2>
        <p className="text-semantic-fg-secondary product-body-text-3-regular">
          {description}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

import cn from "clsx";
import * as React from "react";
import { Nullable } from "../../types/general";

type TabMenuContextValue = {
  selectedValue: Nullable<string>;
  setSelectedValue?: (value: Nullable<string>) => void;
};

const TabMenuContext = React.createContext<TabMenuContextValue>({
  selectedValue: null,
});

const useTabMenuContext = () => {
  const context = React.useContext(TabMenuContext);
  if (context === undefined) {
    throw new Error("useTabMenuContext must be used within a TabMenuProvider");
  }
  return context;
};

const TabMenuRoot = ({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}) => {
  const [selectedValue, setSelectedValue] = React.useState<Nullable<string>>(
    defaultValue ?? null
  );

  const context: TabMenuContextValue = React.useMemo(
    () => ({
      selectedValue,
      setSelectedValue: (value: Nullable<string>) => {
        setSelectedValue(value);
      },
    }),
    [selectedValue]
  );

  return (
    <TabMenuContext.Provider value={context}>
      <div className={cn("flex h-8 flex-row gap-x-4", className)}>
        {children}
      </div>
    </TabMenuContext.Provider>
  );
};

const TabMenuItem = (
  props: {
    children: React.ReactNode;
    value: string;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className, value, onClick, ...passThrough } = props;

  const { selectedValue, setSelectedValue } = useTabMenuContext();

  return (
    <button
      {...passThrough}
      className={cn(
        "h-8 border-b-4 border-[#1D2433] border-opacity-0 text-semantic-fg-disabled product-button-button-3 hover:bg-semantic-accent-bg-alt",
        "data-[selected=true]:border-semantic-accent-default data-[selected=true]:border-opacity-100 data-[selected=true]:text-semantic-fg-primary",
        className
      )}
      data-selected={selectedValue === value}
      onClick={(e) => {
        onClick?.(e);

        if (setSelectedValue) {
          if (selectedValue === value) {
            setSelectedValue(null);
          } else {
            setSelectedValue(value);
          }
        }
      }}
    >
      {children}
    </button>
  );
};

export const TabMenu = {
  Root: TabMenuRoot,
  Item: TabMenuItem,
};
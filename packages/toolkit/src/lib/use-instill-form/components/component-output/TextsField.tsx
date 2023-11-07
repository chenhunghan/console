import { CopyToClipboardButton } from "../../../../components";
import { Nullable } from "../../../type";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type TextsFieldProps = {
  nodeType: "end" | "connector";
  title: Nullable<string>;
  texts: Nullable<string>[];
};

export const TextsField = (props: TextsFieldProps) => {
  const { nodeType, title, texts } = props;

  if (nodeType === "connector") {
    <ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex w-full flex-col flex-wrap gap-2">
        {texts?.map((text) => (
          <div
            key={`${title}-${text}-field`}
            className="relative flex w-full flex-row justify-between gap-x-2 rounded-sm border border-semantic-bg-line p-2"
          >
            <pre className="flex min-h-[36px] w-full flex-1 items-center whitespace-pre-line break-all text-semantic-fg-primary product-body-text-4-regular">
              {text}
            </pre>
            {text ? (
              <CopyToClipboardButton
                className="!absolute !right-2 !top-2 !px-1 !py-1"
                text={text}
              />
            ) : null}
          </div>
        ))}
      </div>
    </ConnectorNodeFieldRoot>;
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex-row flex-wrap gap-2">
        {texts?.map((text) => (
          <div
            key={`${title}-${text}-field`}
            className="relative flex w-full flex-row items-center justify-between gap-x-2 rounded-sm border border-semantic-bg-line p-2"
          >
            <pre className="flex min-h-[36px] flex-1 whitespace-pre-line break-all text-semantic-fg-primary product-body-text-4-regular">
              {text}
            </pre>
            {text ? (
              <CopyToClipboardButton
                className="!absolute !right-2 !top-2 !px-1 !py-1"
                text={text}
              />
            ) : null}
          </div>
        ))}
      </div>
    </EndNodeFieldRoot>
  );
};
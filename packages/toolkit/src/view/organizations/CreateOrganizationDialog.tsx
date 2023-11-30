import * as z from "zod";
import * as React from "react";
import {
  Button,
  Dialog,
  Form,
  Icons,
  Input,
  Logos,
  Select,
  Textarea,
  toast,
} from "@instill-ai/design-system";

import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Nullable, useCreateOrganization } from "../../lib";
import { LoadingSpin } from "../../components";

export type CreateOrganizationDialogProps = {
  accessToken: Nullable<string>;
  onCreate?: () => void;
};

const CreateTokenSchema = z.object({
  id: z.string().nonempty(),
  org_name: z.string().nonempty(),
  profile_avatar: z.nullable(z.string()),
  profile_data: z.object({
    homepage: z.nullable(z.string()),
    github_username: z.nullable(z.string()),
    twitter_username: z.nullable(z.string()),
    organization_bio: z.nullable(z.string()),
    organization_type: z.nullable(z.string()),
  }),
});

export const CreateOrganizationDialog = (
  props: CreateOrganizationDialogProps
) => {
  const [open, setOpen] = React.useState(false);
  const { accessToken, onCreate } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const [imagePreview, setImagePreview] =
    React.useState<Nullable<string>>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImagePreview(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    // Reset file input value to allow selecting the same file again
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ""; // This resets the input value
    }
  };

  const form = useForm<z.infer<typeof CreateTokenSchema>>({
    resolver: zodResolver(CreateTokenSchema),
    defaultValues: {
      id: "",
      org_name: "",
      profile_data: {
        homepage: null,
        github_username: null,
        twitter_username: null,
        organization_bio: null,
        organization_type: null,
      },
      profile_avatar: null,
    },
  });

  const createOrganization = useCreateOrganization();
  const handleCreateOrganization = (
    data: z.infer<typeof CreateTokenSchema>
  ) => {
    if (!accessToken) return;

    console.log("data", data);

    const payload = {
      id: data.id,
      org_name: data.org_name,
      profile_avatar: imagePreview,
      profile_data: {
        homepage: data.profile_data.homepage,
        github_username: data.profile_data.github_username,
        twitter_username: data.profile_data.twitter_username,
        organization_bio: data.profile_data.organization_bio,
        organization_type: data.profile_data.organization_type,
      },
    };

    setIsLoading(true);

    createOrganization.mutate(
      { payload, accessToken },
      {
        onSuccess: () => {
          setIsLoading(false);
          if (onCreate) {
            onCreate();
          }
          toast({
            title: "Organization created!",
            variant: "alert-success",
            size: "small",
          });
          form.reset();
          handleDelete();
          setOpen(false);
        },
        onError: (err) => {
          setIsLoading(false);
          if (isAxiosError(err)) {
            if (err.response?.status === 409) {
              form.setError("id", {
                type: "manual",
                message: "Organization ID already existed",
              });
              return;
            }
            form.setError("id", {
              type: "manual",
              message: err.response?.data.message,
            });
          }
        },
      }
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
      <Dialog.Trigger asChild>
        <Button variant="primary" size="lg">
          Create Organization
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="!w-[650px]">
        <Dialog.Header>
          <Dialog.Title>
            <div className="flex flex-row gap-x-4">
              <div className="my-auto rounded-lg bg-white p-3">
                <Logos.OpenAI className="h-6 w-6" />
              </div>
              <p className="my-auto product-headings-heading-1">
                New Organization
              </p>
            </div>
          </Dialog.Title>
        </Dialog.Header>

        <Form.Root {...form}>
          <form
            className="w-full space-y-3"
            onSubmit={form.handleSubmit(handleCreateOrganization)}
          >
            <div className="flex w-full flex-row gap-x-4">
              <Form.Field
                control={form.control}
                name="id"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Organization username *
                      </Form.Label>
                      <Form.Control>
                        <Input.Root>
                          <Input.Core
                            id={field.name}
                            type="text"
                            placeholder="Username"
                            {...field}
                            value={field.value || ""}
                          />
                        </Input.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />

              <Form.Field
                control={form.control}
                name="org_name"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Organization Full name *
                      </Form.Label>
                      <Form.Control>
                        <Input.Root>
                          <Input.Core
                            id={field.name}
                            type="text"
                            placeholder="Full name"
                            {...field}
                            value={field.value || ""}
                          />
                        </Input.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />
            </div>

            <div className="w-full space-y-3">
              <p className="product-body-text-1-semibold">Upload your logo</p>
              <div className="my-auto cursor-pointer rounded border border-dashed bg-slate-50 text-center">
                {imagePreview && (
                  <Icons.Trash01
                    onClick={() => handleDelete()}
                    className="relative top-1 h-10 w-10 stroke-red-500 p-2 text-white"
                  />
                )}

                {imagePreview ? (
                  <div className="pb-5">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mx-auto h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="fileInput"
                    className="flex cursor-pointer flex-col"
                  >
                    <div className="cursor-pointer space-y-4 px-10 py-10">
                      <Icons.Upload01 className="mx-auto h-8 w-8 stroke-slate-500" />
                      <p className="mx-auto product-body-text-4-regular">
                        Drag-and-drop file, or browse computer
                      </p>
                    </div>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <div className="flex w-full flex-row gap-x-4">
              <Form.Field
                control={form.control}
                name="profile_data.organization_type"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Organization type
                      </Form.Label>
                      <Form.Control>
                        <Select.Root onValueChange={field.onChange}>
                          <Select.Trigger className="w-full">
                            <Select.Value
                              placeholder="Select Organization"
                              defaultValue={"company"}
                            />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Group>
                              <Select.Item value="company">Company</Select.Item>
                              <Select.Item value="individual">
                                Individual
                              </Select.Item>
                              <Select.Item value="team">Team</Select.Item>
                            </Select.Group>
                          </Select.Content>
                        </Select.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />

              <Form.Field
                control={form.control}
                name="profile_data.homepage"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Homepage
                      </Form.Label>
                      <Form.Control>
                        <Input.Root>
                          <Input.Core
                            id={field.name}
                            type="text"
                            placeholder="Homepage"
                            {...field}
                            value={field.value || ""}
                          />
                        </Input.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />
            </div>
            <div className="flex w-full flex-row gap-x-4">
              <Form.Field
                control={form.control}
                name="profile_data.github_username"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Github username
                      </Form.Label>
                      <Form.Control>
                        <Input.Root>
                          <Input.Core
                            id={field.name}
                            type="text"
                            placeholder="Github username"
                            {...field}
                            value={field.value || ""}
                          />
                        </Input.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />

              <Form.Field
                control={form.control}
                name="profile_data.twitter_username"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-1/2">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Twitter username
                      </Form.Label>
                      <Form.Control>
                        <Input.Root>
                          <Input.Core
                            id={field.name}
                            type="text"
                            placeholder="Twitter username"
                            {...field}
                            value={field.value || ""}
                          />
                        </Input.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />
            </div>

            <div className="w-full space-y-2">
              <Form.Field
                control={form.control}
                name="profile_data.organization_bio"
                render={({ field }) => {
                  return (
                    <Form.Item className="w-full">
                      <Form.Label
                        htmlFor={field.name}
                        className="product-body-text-2-semibold"
                      >
                        Organization bio
                      </Form.Label>
                      <Form.Control>
                        <Textarea
                          placeholder="Content"
                          id={field.name}
                          {...field}
                          value={field.value || ""}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  );
                }}
              />
            </div>

            <div className="mt-8 w-full">
              <Button
                type="submit"
                className="w-full flex-1"
                variant="primary"
                size="lg"
              >
                {isLoading ? <LoadingSpin /> : "Create Organization"}
              </Button>
            </div>
          </form>
        </Form.Root>

        <Dialog.Close className="!right-6 !top-6" />
      </Dialog.Content>
    </Dialog.Root>
  );
};
